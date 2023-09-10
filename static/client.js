'use strict';

const host = '127.0.0.1';
const apiPort = '8001';
const path = `http://${host}:${apiPort}`;
const transport = {};
const apiStructure = {
    user: {
        create: ['record'],
        read: ['id'],
        update: ['id', 'record'],
        delete: ['id'],
        find: ['mask'],
    },
    country: {
        read: ['id'],
        delete: ['id'],
        find: ['mask'],
    },
};

transport.http = (url) => (structure) => {
    const api = {};
    const services = Object.keys(structure);
    for (const serviceName of services) {
        api[serviceName] = {};
        const service = structure[serviceName];
        const methods = Object.keys(service);
        for (const methodName of methods) {
            api[serviceName][methodName] = (...args) => new Promise((resolve, reject) => {
                const path = `${url}/${serviceName}/${methodName}/${args}`;
                fetch(path, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(args),
                }).then((res) => {
                    const { status } = res;
                    if (status !== 200) {
                        reject(new Error(`Status code: ${status}`));
                        return;
                    }
                    resolve(res.json());
                });
            });
        }
    }
    return Promise.resolve(api);
};

transport.ws = (url) => (structure) => {
    const socket = new WebSocket(url);
    const api = {};
    const services = Object.keys(structure);
    for (const serviceName of services) {
        api[serviceName] = {};
        const service = structure[serviceName];
        const methods = Object.keys(service);
        for (const methodName of methods) {
            api[serviceName][methodName] = (...args) => new Promise((resolve) => {
                const bunch = { name: serviceName, method: methodName, args };
                socket.send(JSON.stringify(bunch));
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    resolve(data);
                };
            });
        }
    }
    return new Promise((resolve) => {
        socket.addEventListener('open', () => resolve(api));
    });
};

const scaffold = (url) => {
    const protocol = url.startsWith('ws:') ? 'ws' : 'http';
    return transport[protocol](url);
};

(async () => {
    const api = await scaffold(path)(apiStructure);
    console.log(api);
    const data = await api.user.read(3);
    console.dir(...data);
})();
