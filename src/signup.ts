import express from 'express';
import { IUser } from './database/User';
import { User } from './database/Connection';
import { sendPhoneVerification } from './sendToQueue';

const signup = express();

signup.post('/', (req, res) => {
    const user = req.body as Signup;

    const newUser = new User();
    newUser.name = user.name,
    newUser.email = user.email,
    newUser.phone = user.phone,
    newUser.userName = user.userName,
    newUser.password = user.password

    newUser.save().then((u: IUser) => { 
        res.sendStatus(201);
        sendPhoneVerification(u.phone);
    })
    .catch((_) => res.status(500).send(_));
});

export default signup;

interface Signup {
    name: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
}
