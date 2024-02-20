import axios from 'axios';
let data = 'getBalance() {\n    if(this.address) {\n        let params = {\n            chainId: 1,\n            account: your wallet address,\n            inTokenAddress:`${previousTokenAddress},${nextTokenAddress}`\n            };\n        axios.get(\'https://open-api.openocean.finance/v1/cross/getBalance\', { params }).then(res => {\n            const { data } = res.data\n            const previousBalance = data[0].balance\n            const nextBalance = data[1].balance\n        }).catch(e => console.log(e));\n    }\n},';

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v3/1/swap_quote?inTokenAddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&outTokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&account=0xbdfa4f4492dd7b7cf211209c4791af8d52bf5c50&amount=1&gasPrice=25&slippage=1',
    headers: {
        'Content-Type': 'application/javascript',
        'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5YsbKrdp4g3f3'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });

