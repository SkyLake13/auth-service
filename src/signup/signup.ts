import express from 'express';
import { Signup } from './models';
import User from '../database/user.schema';

const app = express();

app.post('/', async (req, res) => {
    const user = req.body as Signup;

    const newUser = new User({
        name: user.name,
        email: user.email,
        userName: user.userName,
        password: user.password
    });

    await newUser.save();
    res.status(201).send(newUser);
});

export { app as signup };
