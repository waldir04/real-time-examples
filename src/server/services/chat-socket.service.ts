import { Subject, Observable } from 'rxjs';

import { ServiceClass } from '../classes/service.class';
import { Server } from './server.service';
import { SocketChat } from '../interfaces/socket-chat.model';
import { ChatEvent } from '../constants/chat-event.const';

export class ChatSocketService extends ServiceClass {
    private io: SocketIO.Server;
    private serverService: Server;
    private $newUserSubject: Subject<any>;;
    private $newMessageSubject: Subject<any>;
    private $typingSubject: Subject<any>;
    private $stopTypingSubject: Subject<any>;
    private $disconnectSubject: Subject<any>;
    
    private constructor() {
        super();
        this.serverService = Server.getInstance();
        this.$newMessageSubject = new Subject();
        this.$newUserSubject = new Subject();
        this.$typingSubject = new Subject();
        this.$stopTypingSubject = new Subject();
        this.$disconnectSubject = new Subject();
    }

    public get onNewUser(): Observable<{ username: string, socket: SocketChat }> {
        return this.$newUserSubject.asObservable();
    }

    public get onNewMessage(): Observable<{ message: string, socket: SocketChat }> {
        return this.$newMessageSubject.asObservable();
    }

    public get onTyping(): Observable<any> {
        return this.$typingSubject.asObservable();
    }

    public get onStopTyping(): Observable<any> {
        return this.$stopTypingSubject.asObservable();
    }

    public get onDisconnect(): Observable<any> {
        return this.$disconnectSubject.asObservable();
    }

    public listen(): void {
        this.serverService.startSocket();
        this.io = this.serverService.io;
        this.listenEvents();
    }

    private listenEvents(): void {
        this.io
        .of('chat-socket')
        .on('connection', (socket: SocketChat) => {
            socket.on(ChatEvent.UserJoined, (username) => 
                this.$newUserSubject.next({ username, socket }) 
            );

            socket.on(ChatEvent.NewMessage, (message) => 
                this.$newMessageSubject.next({ message, socket }) 
            );

            socket.on(ChatEvent.Typing, () => 
                this.$typingSubject.next(socket) 
            );

            socket.on(ChatEvent.StopTyping, () => 
                this.$stopTypingSubject.next(socket) 
            );

            socket.on(ChatEvent.Disconnect, () => 
                this.$disconnectSubject.next(socket) 
            );
        });
    }
}