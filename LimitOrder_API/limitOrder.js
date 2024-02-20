import { LimitOrderNodeSdk } from '@openocean.finance/limitorder-sdk';
import Web3 from "web3";
import axios from "axios";

let chainId = 5;
const providerUrl = 'https://goerli.infura.io/v3/648e5a1412c14b96a75eb8b4e3052682';
const web3 = new Web3(providerUrl);

let privateKey = '91dac42b1225218462d813e8eb7a2b159c2e865e26bea3d3352dd6c94dd69830';

let inToken = {
    "address": "0x9FD21bE27A2B059a288229361E2fA632D8D2d074",
    "decimals": 6,
    "symbol": "USDC",
};
let outToken = {
    "address": "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33",
    "decimals": 18,
    "symbol": "DAI"
};
let gasPrice = '3000000'; // Convert to string

const baseUrl = 'https://open-api.openocean.finance';

let openoceanLimitOrderSdk = new LimitOrderNodeSdk(chainId, web3, privateKey);

async function createOrder() {
    try {
        let orderData = await openoceanLimitOrderSdk.createLimitOrder({
            makerTokenAddress: inToken.address,
            makerTokenDecimals: inToken.decimals,
            takerTokenAddress: outToken.address,
            takerTokenDecimals: outToken.decimals,
            makerAmount: 1000000000000, // USDC
            takerAmount: 2000000000000000000, // DAI
            gasPrice,
            expire: '6Month'
        });

        const result = await axios.post(
            `${baseUrl}/v1/${chainId}/limit-order`,
            orderData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(result);
    } catch (error) {
        console.error('Error creating order:', error.message);
    }
}

async function cancelOrder() {
    try {
        let orderList = await getOrderList();

        if (orderList && orderList.length) {
            const order = orderList[0];
            const result = await axios.post(
                `${baseUrl}/v1/${chainId}/limit-order/cancelLimitOrder`,
                { orderHash: order.orderHash },
            );

            const { status } = (result && result.data) || {};
            if (!(status === 3 || status === 4)) {
                let res = await openoceanLimitOrderSdk.cancelLimitOrder({
                    orderData: order.data,
                    gasPrice,
                });
                console.log(res);
            }
        }
    } catch (error) {
        console.error('Error canceling order:', error.message);
    }
}

async function getOrderList() {
    try {
        const reqUrl = `${baseUrl}/v1/${chainId}/limit-order/address/${openoceanLimitOrderSdk.signerAddress}?page=1&limit=100&statuses=[1,2,5]&sortBy=createDateTime&exclude=0`;
        const { data } = await axios.get(reqUrl);
        return data.data;
    } catch (error) {
        console.error('Error fetching order list:', error.message);
        return [];
    }
}

createOrder();

