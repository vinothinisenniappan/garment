const mongoose = require('mongoose');
const userController = require('./backend/controllers/api/userController');
require('dotenv').config();

async function testLoginRoute() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/garment-export');
        console.log('MongoDB connected');

        const req = {
            body: { email: 'vino@m.com', password: 'anypassword' },
            session: {}
        };

        const res = {
            status: (code) => {
                console.log('Status set to:', code);
                return res;
            },
            json: (data) => {
                console.log('JSON Output:', data);
            }
        };

        await userController.login(req, res);

        console.log('Done testing login.');
        process.exit(0);
    } catch (e) {
        console.error('Test crashed with:', e);
        process.exit(1);
    }
}

testLoginRoute();
