import * as uuidv4 from 'uuid/v4';

import { ServiceClass } from '../classes/service.class';

export class UserService extends ServiceClass {
    public id: string;

    private name: string;

    private constructor() {
        super();
        this.id = uuidv4();
    }

    public get userName(): string {
        return this.name;
    }

    public set userName(username: string) {
        this.name = username;
    }
}