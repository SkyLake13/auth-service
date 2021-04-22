import express from 'express';
import { Signup } from './models';
import { User } from '../database/User';

const app = express();

app.post('/', (req, res) => {
    const user = req.body as Signup;

    const newUser = new User({
        name: user.name,
        email: user.email,
        userName: user.userName,
        password: user.password
    });

    newUser.save().then(() => res.sendStatus(201))
    .catch((_) => res.status(500).send(_));
});

export { app as signup };
