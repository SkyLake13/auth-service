import { Schema, Document } from 'mongoose';

export const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [],
        required: true
    },
});

export interface IRole extends Document {
    name: string;
    users: string[];
}

