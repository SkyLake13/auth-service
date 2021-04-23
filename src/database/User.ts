import { Schema, Document } from 'mongoose';

export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
    verified: boolean;
}

