const fetch = require('node-fetch');
var md5 = require('md5');

const BASE_URL = 'https://www.gravatar.com/';

function getEmailHash(email) {
    return md5(email.trim().toLowerCase());
}

// valid email - beau@dentedreality.com.au
function sendRequest(email) {
    return fetch(BASE_URL + getEmailHash(email), { method: 'GET'}).then(async response => {
        const profile = await response.text();
        return profile;
    })
}

module.exports = {
    sendRequest
};