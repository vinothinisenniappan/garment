const http = require('http');

const data = JSON.stringify({
    email: 'vino@m.com',
    password: 'anypassword'
});

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/user/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${res.headers['content-type']}`);

    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        console.log('Body:', body);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
