import express from 'express';
import { Signup } from './models';
import { IUser, User } from '../database/User';
import { sendPhoneVerification } from '../queue/sendToQueue';

const app = express();

app.post('/', (req, res) => {
    const user = req.body as Signup;

    const newUser = new User({
        name: user.name,
        email: user.email,
        phone: user.phone,
        userName: user.userName,
        password: user.password
    });

    newUser.save().then((u: IUser) => { 
        res.sendStatus(201);
        sendPhoneVerification(u.phone);
    })
    .catch((_) => res.status(500).send(_));
});

export { app as signup };
