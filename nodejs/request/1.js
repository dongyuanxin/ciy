const axios = require('axios').default;

async function main() {
    const res = await axios.get('http://localhost:3000', {
        headers: {
            Host: 'test-env.service.tcloudbase.com',
            Origin: 'http://cross-domain.com',
        },
    });
    console.log('res is', res);
}

main();
