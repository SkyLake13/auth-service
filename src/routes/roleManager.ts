import express from 'express';
import { authorize } from '../middlewares/auth';
import { Role } from '../database/Connection';

interface RoleResponse {
    id: string; name: string; users: string[];
}

interface RoleRequest {
    name: string; users: string[];
}

const roleManager = express();
roleManager.use(authorize);

roleManager.get('/', async (_req, res) => {
    const roles = await Role.find();
    const rolesResponse = roles.map((r) => {
                        return {
                            id: r.id,
                            name: r.name,
                            users: r.users
                        } as RoleResponse
                    });

    res.status(200).send(rolesResponse);
});

roleManager.post('/', async (req, res) => {
    const roleRequest = req.body as RoleRequest;

    const role = new Role();
    role.name = roleRequest.name;
    role.users = roleRequest.users;

    const newRole = await role.save();

    res.status(200).send(newRole);
});

roleManager.get('/:id', async (req, res) => {
    const id = req.params['id'];

    const role = await Role.findById(id);

    const roleResponse = { id: role?.id, name: role?.name, users: role?.users } as RoleResponse;

    res.status(200).send(roleResponse);
});

roleManager.patch('/:id', async (req, res) => {
    const id = req.params['id'];
    const roleRequest = req.body as RoleRequest;

    const role = await Role.findById(id);

    if(role && roleRequest.name) {
        role.name = roleRequest.name;
    }

    if(role && roleRequest.users) {
        role.users.push(...roleRequest.users);
    }

    const updatedRole = await role?.save();

    res.status(200).send(updatedRole);
});

export default roleManager;
