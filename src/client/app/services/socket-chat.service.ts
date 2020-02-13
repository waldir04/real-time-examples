import * as socketIo from 'socket.io-client';

import { Api } from '../constants/api.const';
import { ServiceClass } from '../classes/service.class';
import { Subject, Observable } from 'rxjs';

export class SocketChatService extends ServiceClass {
    private socket: SocketIOClient.Socket;
    private $newMessageSubject: Subject<any>;

    constructor() {
        super();
        this.socket = socketIo(Api.SOCKET_URL);
        this.$newMessageSubject = new Subject();
        this.listen();
    }

    public get onNewMessage(): Observable<any> {
        return this.$newMessageSubject.asObservable();
    }

    public register(username: string): void {
        this.socket.emit('user joined', username);
    }

    public message(message: string): void {
        this.socket.emit('new message', message);
    }

    private listen(): void {
        this.socket.on('new message', (data: any) => this.$newMessageSubject.next(data));
    }
}