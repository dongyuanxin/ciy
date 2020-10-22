const got = require('got');
const axios = require('axios');

main();

async function main() {
    const headers = {};

    const environments = {
        key1: 'value1',
        key2: 'value2',
    };
    // headers['X-Scf-Environments'] = Reflect.ownKeys(environments).map(
    //     key => `${key}=${environments[key]}`,
    // );

    headers['X-Scf-Environments'] = {
        a: 'b',
    };

    console.log(headers);

    await got('http://127.0.0.1:9999', {
        headers,
    });

    await axios('http://127.0.0.1:9999', {
        headers,
    });
}
