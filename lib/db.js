'use strict';

const crud = () => ({
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

    async update(id, { ...record }) {
        console.log('db UPDATE', id, record);
        return { key: 'value' };
    },

    delete(id) {
        console.log('db DELETE', id);
        return { key: 'value' };
    },
});

module.exports = () => crud();
