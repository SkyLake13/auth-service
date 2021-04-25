import express, { Request, Response } from 'express';
import { authorize } from '../middlewares/auth';
import { Role } from '../database/Connection';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IRole } from '../database/Role';

interface RoleResponse {
    id: string; name: string; users: string[];
}

interface RoleRequest {
    name: string; users: string[];
}

export function get(model: Model<IRole, {}>) {
    return async function (_req: Request, res: Response) {
        const roles = await model.find();
        const rolesResponse = roles.map((r) => {
                            return {
                                id: r.id,
                                name: r.name,
                                users: r.users
                            } as RoleResponse
                        });
    
        res.status(200).send(rolesResponse);
    }
}

export function getById(model: Model<IRole, {}>) {
    return async function (req: Request, res: Response) {
        const id = req.params['id'];

        const role = await model.findById(id);
    
        const roleResponse = { id: role?.id, name: role?.name, users: role?.users } as RoleResponse;
    
        res.status(200).send(roleResponse);
    }
}

export function post(model: Model<IRole, {}>) {
    return async function (req: Request, res: Response) {
        const roleRequest = req.body as RoleRequest;

        const role = new model();
        role.name = roleRequest.name;
        role.users = roleRequest.users;
    
        const newRole = await role.save();
    
        res.status(200).send(newRole);
    }
}

export function patch(model: Model<IRole, {}>) {
    return async function (req: Request, res: Response) {
        const id = req.params['id'];
        const roleRequest = req.body as RoleRequest;
    
        const role = await model.findById(id);
    
        if(role && roleRequest.name) {
            role.name = roleRequest.name;
        }
    
        if(role && roleRequest.users) {
            role.users.push(...roleRequest.users);
        }
    
        const updatedRole = await role?.save();
    
        res.status(200).send(updatedRole);
    }
}

export default express.Router()
     //.use(authorize(verify))
    .get('/', get(Role))
    .get('/:id', getById(Role))
    .post('/', post(Role))
    .patch('/:id', patch(Role));
