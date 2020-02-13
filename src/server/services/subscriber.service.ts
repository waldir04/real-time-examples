import * as express from 'express';

import { ServiceClass } from '../classes/service.class';

export class Subscriber extends ServiceClass {
    public subscriptions: { [key: string]: express.Response };
    
    private constructor() {
        super();
        this.clear();
    }

    public add(id: string, response: express.Response): void {
        this.subscriptions[id] = response;
    }
    
    public clear(): void {
        this.subscriptions = Object.create(null);
    }

    public get(id: string): express.Response {
        return this.subscriptions[id];
    }

    public remove(id: string): void {
        if (this.subscriptions[id]) {
            this.subscriptions[id].end();
            delete this.subscriptions[id];
        }
    }
}
