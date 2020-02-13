
import * as express from 'express';
import * as uuidv4 from 'uuid/v4';

import { MessageModel } from '../interfaces/message.model';
import { Subscriber } from '../services/subscriber.service';
import { Message } from '../services/message.service';

export class ChatSseController {
    private subscriberService: Subscriber;
    private messageService: Message;

    constructor() {
        this.messageService = Message.getInstance();
        this.subscriberService = Subscriber.getInstance();
    }

    public onMessage(request: express.Request, response: express.Response): void {
        const { message, username } = request.body;

        const newMessage = this.publish({ message, username });

        this.messageService.add(newMessage);

        response.status(200).json();
    }

    public onSubscribe(request: express.Request, response: express.Response): void {
        const id = request.params.id;

        this.setEventStreamHeader(response);
        this.listenOnDisconnected(id, request);

        this.subscriberService.add(id, response);
    }

    private publish(data: MessageModel): MessageModel {
        const { username, message } = data;
        const subscriptions = this.subscriberService.subscriptions;
        const date = new Date().toString();
        let responseText = '';

        for (let id in subscriptions) {
            let response = this.subscriberService.get(id);

            responseText = `event: message\nid: ${uuidv4()}\ndata: ${JSON.stringify({ username, message, date })}\n\n`;

            response.write(responseText);
        }

        return { username, message, date };
    }

    private setEventStreamHeader(response: express.Response): void {
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }); 
    }

    private listenOnDisconnected(id: string, request: express.Request): void {
        request.on('close', () => {
            this.subscriberService.remove(id);
        });
    }
}