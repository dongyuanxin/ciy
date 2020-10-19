const got = require('got');
const http = require('http');
const HttpAgent = require('agentkeepalive');
const ProxyAgent = require('proxy-agent');

const proxyAgent = new ProxyAgent('http://127.0.0.1:12639/');
const keepAliveAgent = new HttpAgent();

const agent = {
    http: new http.Agent({
        ...proxyAgent,
        ...keepAliveAgent,
    }),
    // http: proxyAgent
};

// console.log(new http.Agent({
//     ...proxyAgent,
//     ...keepAliveAgent
// }))

// console.log(agent)
// console.log(new HttpAgent())
console.log(agent);
main4();

async function main() {
    let url = 'http://service.xxoo521.com/apis';

    try {
        const res = await got({
            url,
            method: 'GET',
            retry: 0,
            followRedirect: false,
            methodRewriting: false,
            decompress: false,
            timeout: 20 * 1000,
        });
        console.log('>>> res is', res);
    } catch (error) {
        console.log('>>> error is', error);
    }
}

async function main2() {
    let url = 'https://service.xxoo521.com/apis/search/passages';

    try {
        const res = await got({
            url,
            method: 'POST',
            // body: JSON.stringify({
            //     keywords: ["dsadf"],
            //     page: 1,
            //     size: 10
            // }),
            responseType: 'json',
            json: {
                keywords: ['dsadf'],
                page: 1,
                size: 10,
            },
            retry: 0,
            followRedirect: false,
            methodRewriting: false,
            decompress: false,
            timeout: 20 * 1000,
        });
        console.log('>>> res is', res);
    } catch (error) {
        console.log('>>> error is', error);
    }
}

async function main3() {
    let url = 'http://service.xxoo521.com/apis/search/passages';

    try {
        const res = await got({
            url,
            method: 'POST',
            // body: JSON.stringify({
            //     keywords: ["dsadf"],
            //     page: 1,
            //     size: 10
            // }),
            responseType: 'json',
            json: {
                keywords: ['dsadf'],
                page: 1,
                size: 10,
            },
            retry: 0,
            followRedirect: false,
            methodRewriting: false,
            decompress: false,
            timeout: 20 * 1000,
            agent,
        });
        console.log('>>> res is', res.body);
    } catch (error) {
        console.log('>>> error is', error);
    }
}

async function main4() {
    const { HttpProxyAgent } = require('hpagent');

    let url = 'http://service.xxoo521.com/apis/search/passages';

    try {
        const res = await got({
            url,
            method: 'POST',
            // body: JSON.stringify({
            //     keywords: ["dsadf"],
            //     page: 1,
            //     size: 10
            // }),
            responseType: 'json',
            json: {
                keywords: ['dsadf'],
                page: 1,
                size: 10,
            },
            retry: 0,
            followRedirect: false,
            methodRewriting: false,
            decompress: false,
            timeout: 20 * 1000,
            agent: {
                http: new HttpProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 1000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    proxy: 'http://127.0.0.1:12639/',
                }),
            },
        });
        console.log('>>> res is', res.body);
    } catch (error) {
        console.log('>>> error is', error);
    }
}
