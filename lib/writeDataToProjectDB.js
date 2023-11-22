const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const entryPath = path.join(process.cwd(), './db/projects/')

const writeDataToProjectDB = async (address, data) => {
    const { projectName, fileId, entity } = address;
    const entityDirPath = `${entryPath}${projectName}/${entity}`;
    const filePath = `${entityDirPath}/${fileId}.json`;
    if (!fs.existsSync(entityDirPath)) {
        fs.mkdirSync(entityDirPath, { recursive: true });
    }
    return await fsp.writeFile(filePath, data);
};

module.exports = writeDataToProjectDB;
