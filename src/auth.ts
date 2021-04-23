import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

const privateKey = (process.env as any).JWT_PRIVATE_KEY;

export function createToken(payload: {}): string {
    const expiresIn = (process.env as any).TOKEN_EXPIRATION;

    return sign(payload, privateKey, { expiresIn: Number(expiresIn) });
}

export function authorize(req: Request, res: Response, next: any) {
    const authheader = req.headers.authorization;
    if(authheader && (authheader.indexOf('Bearer ') > -1)) {
        const token = req.headers['authorization']?.split(' ')[1];

        if(token && verify(token, privateKey)) {
            return next();
        }
    }

    
    return res.status(403).send('Unauthorized');
}