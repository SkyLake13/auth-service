import express from 'express';
import { Login } from './models';
import { IUser, User } from '../database/User';
import createToken from './jwt';

const app = express();

app.post('/', (req, res) => {
    const _user = req.body as Login;

    User.findOne({ userName: _user.userName })
    .then((user: IUser | null) => {
        if(user && user.password === _user.password) {
            const token = createToken({ userName: user.userName, name: user.name });
            res.status(200).send(token);
        } else {
            res.status(403).send('user not found');
        }
    })
    .catch((_) => res.status(500).send(_));
});

export { app as login };
