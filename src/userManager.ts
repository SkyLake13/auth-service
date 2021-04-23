import express from 'express';
import { authorize } from './auth';
import { User } from './database/Connection';
import { IUser } from './database/User';

interface IBasicUser {
    name: string; email: string, userName: string, phone: string, verified: boolean
}

const userManager = express();
userManager.use(authorize)

userManager.get('/', (req, res) => {
    User.find().then((_users: IUser[]) => {
        const users = _users.map((u) => {
            return { 
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
});

export default userManager;