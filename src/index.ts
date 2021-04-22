import express from 'express';
import { connect, connection } from 'mongoose';

import { login } from './login/login';
import { signup } from './signup/signup';

connect(`mongodb://az-900:1XvtzhgnTnqTk6QBk2m8kAvYC95TaNgQzEM7g6yEblgDLMy591OGLleKvDT3STp5eJ6o1oa0FQE4YtRsZxiQ0g==@az-900.mongo.cosmos.azure.com:10255/userdb?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@az-900@`,
         { useNewUrlParser: true });
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('Connected to database'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/signup', signup);

app.listen(8090, () => console.log('app started.'));
