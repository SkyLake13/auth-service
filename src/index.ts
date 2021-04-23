import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import login from './login';
import roleManager from './roleManager';
import signup from './signup';
import userManager from './userManager';

const PORT = process.env.PORT || 8090;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/signup', signup);
app.use('/user', userManager);
app.use('/role', roleManager);

app.listen(PORT, () => console.log(`app started at port ${PORT}`));
