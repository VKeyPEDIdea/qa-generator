'use strict';

const config = {
    sandbox: {
        timeout: 5000,
        displayErrors: false
    },
    static: {
        root: './build',
        port: 8000,
    },
    hashSettings: {
        encodingScheme: 'base64',
    },
    api: {
        transport: 'http',
        host: '127.0.0.1',
        port: '8001'
    },
    projects: {
      path: './db/projects',
    },
};

module.exports = config;
