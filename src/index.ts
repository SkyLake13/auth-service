import express from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

import login from './routes/login';
import roleManager from './routes/roleManager';
import signup from './routes/signup';
import userManager from './routes/userManager';

const PORT = 3000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/signup', signup);
app.use('/user', userManager);
app.use('/role', roleManager);

app.listen(PORT, () => console.log(`app started at port ${PORT}`));
