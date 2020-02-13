import { SocketChat } from '../interfaces/socket-chat.model';
import { Message } from '../services/message.service';
import { ChatSocketService } from '../services/chat-socket.service';
import { ChatEvent } from '../constants/chat-event.const';

export class ChatSocketController {
    private messageService: Message;
    private chatSocketService: ChatSocketService;

    constructor() {
        this.messageService = Message.getInstance();
        this.chatSocketService = ChatSocketService.getInstance();
    }

    public initialize(): void {
        this.chatSocketService.listen();
        this.handleChatEvents();
    }

    private handleChatEvents(): void {
        this.chatSocketService.onNewUser
            .subscribe(this.handleOnNewUser.bind(this));

        this.chatSocketService.onNewMessage
            .subscribe(this.handleOnNewMessage.bind(this));

        this.chatSocketService.onTyping
            .subscribe(this.handleOnTyping.bind(this));

        this.chatSocketService.onStopTyping
            .subscribe(this.handleOnStopTyping.bind(this));

        this.chatSocketService.onDisconnect
            .subscribe(this.handleOnDisconnect.bind(this));
    }

    private handleOnNewUser(data: any): void {
        data.socket.username = data.username;

        data.socket.broadcast.emit(ChatEvent.UserJoined, {
            username: data.socket.username
        });
    }

    private handleOnNewMessage(data: any): void {
        const message = { 
            username: data.socket.username, 
            message: data.message, 
            date: new Date().toString() 
        };

        this.messageService.add(message);

        data.socket.broadcast.emit(ChatEvent.NewMessage, message);
    }

    private handleOnTyping(socket: SocketChat): void {
        socket.broadcast.emit(ChatEvent.Typing, {
            username: socket.username
        });
    }

    private handleOnStopTyping(socket: SocketChat): void {
        socket.broadcast.emit(ChatEvent.StopTyping, {
            username: socket.username
        });
    }

    private handleOnDisconnect(socket: SocketChat): void {
        socket.broadcast.emit(ChatEvent.UserLeft, {
            username: socket.username
        });
    }
}