'use strict';

const crypto = require('node:crypto');
const { hashSettings } = require('../config.js');

const hash = (password) => new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString(hashSettings.encodingScheme);
    crypto.scrypt(password, salt, 64, (err, result) => {
        if (err) reject(err);
        resolve(salt + ':' + result.toString(hashSettings.encodingScheme));
    });
});

module.exports = hash;
