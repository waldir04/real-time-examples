import { MessageModel } from '../interfaces/message.model';
import { ServiceClass } from '../classes/service.class';

export class Message extends ServiceClass {
    public messages: MessageModel[];

    private constructor() {
        super();
        this.messages = [];
    }

    public add(message: MessageModel): void {    
        this.messages.push(message);
    }
}