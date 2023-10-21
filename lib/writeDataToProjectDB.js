const fsp = require('node:fs/promises');
const path = require('node:path');
const entryPath = path.join(process.cwd(), './db/projects/')

const writeDataToProjectDB = async (address, data) => {
    const { projectName, fileId, entity } = address;
    const filePath = `${entryPath}${projectName}/${entity}/${fileId}.json`;
    return await fsp.writeFile(filePath, data);
};

module.exports = writeDataToProjectDB;
