const axios = require('axios');

// Configuration for the Axios request
const requestConfig = {
    method: 'GET',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v3/avax/quote',
    params: {
        inTokenAddress: '0x783C08b5F26E3daf8C4681F3bf49844e425b6393',
        outTokenAddress: '0xD81D45E7635400dDD9c028839e9a9eF479006B28',
        amount: 5,
        gasPrice: 5,
        slippage: 100
    },
    headers: {
        'Cookie': '__cflb=04dToTzf2tAVdbbrYo9dEjZaJEhDdLPBFB67kApwS5'
    }
};


axios.request(requestConfig)
    .then(response => {
        console.log('Response Data:', JSON.stringify(response.data, null, 2));
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
