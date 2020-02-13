import chatRouter from './../routes/chat.router';
import chatSseRouter from './../routes/chat-sse.router';

import { ChatSocketController } from './../controllers/chat-socket.controller';
import { Server } from './../services/server.service';

export class ServerController {
    private chatSocket: ChatSocketController;
    private serverService: Server;

    constructor() {
        this.chatSocket = new ChatSocketController();
        this.serverService = Server.getInstance();
    }

    public initilize(): void {
        this.setRoutes();
        this.chatSocket.initialize();
        this.serverService.startHttp();
    }

    private setRoutes(): void {
        this.serverService.app.use('/chat', chatRouter);
        this.serverService.app.use('/chat-sse', chatSseRouter);
    }
}