import { Request, Response } from "express";

export function authorization(req: Request, res: Response, next: any) {
    console.log('header', req.headers);
    if(!req.headers.authorization || (req.headers.authorization.indexOf('Bearer ') > -1)) {
        res.status(403).send('Unauthorized');
        return;
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    if(token && token === 'abhishek') {
        return next();
    }
    res.status(403).send('Unauthorized');
    return;
}