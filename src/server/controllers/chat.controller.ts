import * as express from 'express';
import * as uuidv4 from 'uuid/v4';

import { MessageModel } from '../interfaces/message.model';
import { Subscriber } from '../services/subscriber.service';
import { Message } from '../services/message.service';

export class ChatController {
    private subscriberService: Subscriber;
    private messageService: Message;

    constructor() {
        this.messageService = Message.getInstance();
        this.subscriberService = Subscriber.getInstance();
    }

    public getMessages(request: express.Request, response: express.Response): void {
        const messages = this.messageService.messages;

        response.json(messages);
    }

    public onPublish(request: express.Request, response: express.Response): void {
        let message: any;

        request
        .on('data', (data) => {
            message = JSON.parse(data);
        })
        .on('end', () => {
            message = this.setDateMessage(message);
            
            this.publish(message);
    
            response.end();
        });
    }

    public onSubscribe(request: express.Request, response: express.Response): void {
        let id = uuidv4();

        this.subscriberService.add(id, response);

        request.on('close', () => {
            this.subscriberService.remove(id);
        });
    }

    private publish(message: MessageModel): void {
        const subscriptions = this.subscriberService.subscriptions;

        for (let id in subscriptions) {
            let response = this.subscriberService.get(id);

            response.json(message);
        }

        this.messageService.add(message);
        this.subscriberService.clear();
    }

    private setDateMessage(message: MessageModel): MessageModel {
        message.date = new Date().toString();

        return message;
    }
}