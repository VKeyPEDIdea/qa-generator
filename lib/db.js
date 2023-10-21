'use strict';
const writeDataToProjectDB = require('./writeDataToProjectDB');

const crud = (writeDataToFile) => ({
    query(args) {
        console.log(args);
        return { key: 'value' };
    },

    read(id, fields = ['*']) {
        console.log('db READ', id, fields);
        return { key: 'value' };
    },

    async create({ ...record }) {
        console.log('db CREATE', record);
        return { key: 'value' };
    },

    async update(projectName, id, { ...record }) {
        const address = {
            projectName,
            fileId: id,
            entity: 'questions'
        };
        return writeDataToFile(address, JSON.stringify(record));
    },

    delete(id) {
        console.log('db DELETE', id);
        return { key: 'value' };
    },
});

module.exports = () => crud(writeDataToProjectDB);
