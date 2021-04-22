
import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import ValueService from "../services/value.service";
import { Value } from "../models/value.model";

export default class ValueController extends BaseController {
    constructor(private valueService: ValueService) {
        super('Value controller is listening here.');
        super.setUp();

        this.setUp();
    }

    protected setUp() {
        this.router.get('/', this.get.bind(this));
        this.router.post('/', this.post.bind(this));
        this.router.put('/:name', this.put.bind(this));
        this.router.delete('/:name', this.delete.bind(this));
    }

    private get(req: Request, res: Response) {
        const items = this.valueService.get();

        res.send(items);
    }

    private post(req: Request, res: Response) {
        const value: Value = req.body;
        const items = this.valueService.add(value);

        res.send(items);
    }

    private put(req: Request, res: Response) {
        const name = req.params.name;
        const value: Value = req.body;
        
        const item = this.valueService.update(name, value);

        res.send(item);
    }

    private delete(req: Request, res: Response) {
        const name = req.params.name;
        this.valueService.delete(name);

        res.sendStatus(200);
    }
}