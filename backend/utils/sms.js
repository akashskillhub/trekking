const config = require("../config");

const sendSMS = ({ message, mobile }) => {
    const url = `https://www.fast2sms.com/dev/bulkV2?message=${message}&route=q&numbers=${mobile}`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: config.SMS_API_KEY }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}

module.exports = sendSMS