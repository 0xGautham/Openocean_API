const axios = require('axios');

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v3/avax/dexList',
    headers: {
        'Cookie': '__cflb=04dToTzf2tAVdbbrYo9dEjZaJEhDdLPBFB67kApwS5'
    }
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
