import { SignOptions } from "jsonwebtoken";

const privateKey = (process.env as any).JWT_PRIVATE_KEY;

export type SignFunction = (payload: object, key: string, options: SignOptions) => string;

export function generateToken(signFunction: SignFunction) {
    const expiresIn = (process.env as any).TOKEN_EXPIRATION;

    return function (payload: object) {
        return signFunction(payload, privateKey, { expiresIn: Number(expiresIn) });
    }
}
