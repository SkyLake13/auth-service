import express from 'express';
import { Login } from './models';
import { IUser, User } from '../database/User';

const app = express();

app.post('/', (req, res) => {
    const _user = req.body as Login;

    User.findOne({ userName: _user.userName })
    .then((user: IUser | null) => {
        user && user.password === _user.password ? res.status(200).send('token') 
                                    : res.status(403).send('user not found');
    })
    .catch((_) => res.status(500).send(_));
});

export { app as login };
