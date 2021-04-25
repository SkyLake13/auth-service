import express, { Request, Response } from 'express';
import { authorize } from '../middlewares/auth';
import { User } from '../database/Connection';
import { IUser } from '../database/User';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

interface IBasicUser {
    id: string; name: string; email: string, userName: string, phone: string, verified: boolean
}

export function get(model: Model<IUser, {}>) {
    return function (_req: Request, res: Response) {
        model.find().then((_users: IUser[]) => {
            const users = _users.map((u) => {
                return { 
                    id: u.id,
                    name: u.name, 
                    email: u.email, 
                    userName: u.userName, 
                    phone: u.phone,
                    verified: u.verified
                } as IBasicUser;
            });
    
            res.status(200).send(users);
        })
        .catch((err) => res.status(500).send(err));
    }
}


export function getById(model: Model<IUser, {}>) {
    return function (req: Request, res: Response) {
        const id = req.params['id'];

        model.findById(id).then((u: IUser | null) => {
            if(u) {
                const users =  {
                    id: u.id,
                    name: u.name, 
                    email: u.email, 
                    userName: u.userName, 
                    phone: u.phone,
                    verified: u.verified
                } as IBasicUser;
    
                return res.status(200).send(users);
            }
    
            return res.status(404).send('Not found');
        })
        .catch((err) => res.status(500).send(err));
    }
}


export default express.Router()
    // .use(authorize(verify))
    .get('/', get(User))
    .get('/:id', getById(User))

