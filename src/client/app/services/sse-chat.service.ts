import { ServiceClass } from '../classes/service.class';
import { Subject, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Api } from '../constants/api.const';
import { UserService } from './user.service';
import { MessageModel } from '../../../server/interfaces/message.model';

export class SseChatService extends ServiceClass {
    private $newMessageSubject: Subject<any>;
    private eventSource: EventSource;
    private userService: UserService;

    constructor() {
        super();
        this.$newMessageSubject = new Subject();
        this.userService = UserService.getInstance();
        this.initializeMessageEventSource();
    }

    public get onNewMessage(): Observable<MessageModel> {
        return this.$newMessageSubject.asObservable();
    }

    public sendMessage(message: string, username: string): Promise<any> {
        return ajax({
            url: `${Api.SERVER_URL}/chat-sse/message`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { message, username }
        }).toPromise();
    }

    private listenNewMessage(event: MessageEvent): void {
        const message = JSON.parse(event.data)  as MessageModel;
        this.$newMessageSubject.next(message);
    }

    private initializeMessageEventSource(): void {
        const userId = this.userService.id;

        this.eventSource = new EventSource(`${Api.SERVER_URL}/chat-sse/subscribe/${userId}`);
        this.eventSource.addEventListener('message', this.listenNewMessage.bind(this));
    }
}