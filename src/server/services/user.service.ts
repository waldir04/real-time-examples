import { ServiceClass } from '../classes/service.class';

export class User extends ServiceClass {
    private users: string[];

    private constructor() {
        super();
        this.users = [];
    }

    public add(username: string): boolean {
        if (!this.exists(username)) {
            return false;
        }

        this.users.push(username);
        return true;
    }

    public remove(username: string): void {
        const index = this.users.indexOf(username);

        if (index > -1) {
            this.users.splice(index, 1);
        }
    }

    public exists(username: string): boolean {
        return !!this.find(username);
    }

    private find(username: string): string {
        return this.users.find((user) => username === user );
    }
}