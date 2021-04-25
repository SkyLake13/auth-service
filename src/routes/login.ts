import express from 'express';

import { IUser } from '../database/User';
import { User } from '../database/Connection';
import { sendLogin } from '../sendToQueue';
import { createToken } from '../middlewares/auth';

const login = express();

login.post('/', (req, res) => {
    const _user = req.body as Login;

    User.findOne({ userName: _user.userName })
    .then((user: IUser | null) => {
        if(user && user.password === _user.password) {
            const token = createToken({ userName: user.userName, name: user.name });
            res.status(200).send(token);
            sendLogin(user.userName);
        } else {
            res.status(403).send('user not found');
        }
    })
    .catch((_) => res.status(500).send(_));
});

export default login;

interface Login {
    userName: string;
    password: string;
}
