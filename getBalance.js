import axios from 'axios';
import chalk from 'chalk';

const codeStyle = chalk.bold.cyan;
const errorStyle = chalk.bold.red;

const data = `
${codeStyle('getBalance() {')}
    if (this.address) {
        let params = {
            chainId: 1,
            account: ${codeStyle('your wallet address')},
            inTokenAddress: \`${codeStyle('${previousTokenAddress},${nextTokenAddress}')}\`
        };
        axios.get(${codeStyle("'https://open-api.openocean.finance/v1/cross/getBalance', { params }")})
            .then(res => {
                const { data } = res.data;
                const previousBalance = data[0].balance;
                const nextBalance = data[1].balance;
            })
            .catch(e => ${errorStyle('console.log(e)')});
    }
${codeStyle('},')}`;

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://open-api.openocean.finance/v1/cross/getBalance?chainId=56&account=0x929B44e589AC4dD99c0282614e9a844Ea9483C69&inTokenAddress=0x55d398326f99059ff775485246999027b3197955,0x55d398326f99059fF775485246999027B3197955',
    headers: {
        'Content-Type': 'application/javascript',
        'Cookie': '__cflb=0H28v9KzzEdj11imvL2rdb9wNdY43F5YsbKrdp4g3f3'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(chalk.green('Response Data:'));
        console.log(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
        console.error(chalk.red('Error:'));
        console.error(error);
    });
