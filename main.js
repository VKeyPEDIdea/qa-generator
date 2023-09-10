'use strict';

const config = require('./config.js');
const fsp = require('node:fs').promises;
const path = require('node:path');
const server = require(`./transport/${config.api.transport}.js`);
const staticServer = require('./lib/static.js');
const load = require('./lib/load.js')(config.sandbox);
const db = require('./lib/db.js')(config.dbPool);
const hash = require('./lib/common.js');
const logger = require('./lib/logger.js');

const sandbox = {
    console: Object.freeze(logger),
    db: Object.freeze(db),
    common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
    const files = await fsp.readdir(apiPath);
    for (const fileName of files) {
        if (!fileName.endsWith('.js')) continue;
        const filePath = path.join(apiPath, fileName);
        const serviceName = path.basename(fileName, '.js');
        routing[serviceName] = await load(filePath, sandbox);
    }

    staticServer('./static', config.static.port, logger);
    server(routing, config.api.port, logger);
})();
