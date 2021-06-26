console.log('global.js started');

async function request({url, body, method='POST', headers={}}) {
    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        mode: 'same-origin',
        headers: {
            ...headers,
            'accept': 'application/json',
            'content-type': 'application/json',
        }
    }).then(res => res.text());

    return res;
}