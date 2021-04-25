import { createConnection } from 'mongoose';

import { IRole, roleSchema } from './Role';
import { IUser, userSchema } from './User';

const connectionString = (process.env as any).DB_CONNECTION_STRING;
const DbConnection = createConnection(connectionString, 
                        { useNewUrlParser: true, useUnifiedTopology: true });

DbConnection.on('error', (error) => console.error(error));
DbConnection.once('open', () => console.log('Connected to database'));

const User = DbConnection.model<IUser>('user', userSchema, 'users');
const Role = DbConnection.model<IRole>('role', roleSchema, 'roles');


export { User, Role };