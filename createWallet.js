import axios from 'axios';
import chalk from 'chalk';

const data = '';

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v3/bsc/createWallet',
    headers: {
        'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5Yq5hAz6LoBBb'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(chalk.green('Success! Response Data:'));
        console.log(chalk.white(JSON.stringify(response.data, null, 2)));
    })
    .catch((error) => {
        console.log(chalk.red('Error:'));
        console.error(chalk.white(error));
    });
