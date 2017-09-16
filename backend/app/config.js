const path = require('path');

module.exports = {
    secret: '', //secret key for jwt
    database: 'mongodb://localhost/rapoarte_drumuri',
    publicDir: path.join(__dirname,'../public'),
    token_expiration: 99999999999999, //seconds, 60 * 60 * 24 * 365 that means like one year
};
