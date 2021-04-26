import express, { Request, Response } from 'express';

import { IUser } from '../database/User';
import { sendLogin } from '../sendToQueue';
import { Model } from 'mongoose';
import { User } from '../database/Connection';
import { generateToken } from '../token/generateToken';
import { sign } from 'jsonwebtoken';

interface Login {
    userName: string;
    password: string;
}

export function post(model: Model<IUser, {}>) {
    return function (req: Request, res: Response) {    
        const _user = req.body as Login;

        model.findOne({ userName: _user.userName })
            .then((user: IUser | null) => {
                if(user && user.password === _user.password) {
                    const token = generateToken(sign)({ userName: user.userName, name: user.name });
                    sendLogin(user.userName);
            
                    return res.status(200).send({token});
                }
            
                return res.status(403).send('user not found');
            })
            .catch((_) => res.status(500).send('Something went wrong!!!'));
    }
}

export default express.Router()
    .post('/', post(User));

