import express, { Request, Response } from 'express';
import { Model } from 'mongoose';

import { IUser } from '../database/User';
import { User } from '../database/Connection';
import { sendPhoneVerification } from '../sendToQueue';

interface Signup {
    name: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
}

export function post(model: Model<IUser, {}>) {
    return function (req: Request, res: Response) {
        const user = req.body as Signup;

        const newUser = new model();
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
    }
}

export default express.Router()
    .post('/', post(User));

