const fetch = require('node-fetch');

async function simulateLogin() {
    try {
        const response = await fetch('http://localhost:5001/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'vino@m.com', password: 'anypassword' })
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers.get('content-type'));

        const text = await response.text();
        console.log('Body:', text);

    } catch (err) {
        console.error('Fetch Error:', err);
    }
}

simulateLogin();
