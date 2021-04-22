import { Value } from "../../models/value.model";


export default class ValueService {
    public values: Array<Value>;

    constructor() {
        this.values = this.initValuesObject();
    }

    public get(name?: string): Array<Value> {
        if(name) {
            return this.values.filter(x => x.name === name);
        }

        return this.values;
    }

    public add(value: Value): Array<Value> {
       if(value) {
           this.values.push(value);
       }

       return this.values;
    }

    public update(name: string, value: Value): Value {
        if(name) {
            const val = this.values.filter(x => x.name === name);
            if(val.length > 0) {
                const index = this.values.indexOf(val[0]);
                this.values[index] = value;
            }
        }

        return value;
    }

    public delete(name: string): void {
        if(name) {
            
        }
    }

    private initValuesObject(): Array<Value> {
        return [
            new Value('TV1', 'tv1'),
            new Value('TV2', 'tv2'),
            new Value('TV3', 'tv3'),
        ];
    }
}