import { Request, Response } from "express";
import { VerifyOptions } from "jsonwebtoken";

const privateKey = (process.env as any).JWT_PRIVATE_KEY;

export type VerifyFunction = 
        (token: string, privateKey: string, verifyOptions?: VerifyOptions) => object | string;

export function authorize(verifyFunction: VerifyFunction) {

    return function (req: Request, res: Response, next: any) {
        const authheader = req.headers.authorization;
        if(authheader && (authheader.indexOf('Bearer ') > -1)) {
            const token = req.headers['authorization']?.split(' ')[1];
    
            if(token && verifyFunction(token, privateKey)) {
                return next();
            }
        }

        return res.status(403).send('Unauthorized');
    }
}