import express from 'express';
import { Login } from './models';
import User from '../database/user.schema';

const app = express();

app.post('/', async (req, res) => {
    const user = req.body as Login;

    const internalUser = await User.findOne({ userName: user.userName }) as any;
    if (internalUser && internalUser.password === user.password) {
        res.status(200).send('token');
    }
    res.status(403).send('user not found');
});

export { app as login };
