import { $ChatTemplate } from '../../templates/chat.template';
import { Component } from '../../classes/component.class';
import { AppService } from '../../services/app.service';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { SocketChatService } from '../../services/socket-chat.service';
import { ChatUtil } from '../../utils/chat.util';

export class SocketChatRoomComponent implements Component {
    private $form: HTMLFormElement;
    private $chatBox: HTMLElement;
    private appService: AppService;
    private chatService: ChatService;
    private userService: UserService;
    private socketChatService: SocketChatService;

    constructor() {
        this.appService = AppService.getInstance();
        this.chatService = ChatService.getInstance();
        this.userService = UserService.getInstance();
        this.socketChatService = SocketChatService.getInstance();
    }

    public render(): void {
        this.appService.render($ChatTemplate); 
        this.initialize();
    }

    public initialize(): void {
        this.$chatBox = document.getElementById('chat-box');
        this.$form = document.getElementById('publish') as HTMLFormElement;
        this.$form.onsubmit = this.sendMessage.bind(this);
        this.getMessages();
        this.listen();
    }

    private getMessages(): void {
        this.chatService.getMessages()
        .then((response) => this.renderMessages(response));
    }

    private sendMessage(): boolean {
        const message = this.$form.message.value;
        const username = this.userService.userName;
        const date = new Date().toString();

        this.$form.message.value = '';
        this.renderMessage({ message, username, date });
        this.socketChatService.message(message);

        return false;
    }

    private renderMessage({ message, username, date }: any): void {
        const $message = new ChatUtil().renderMessage({ message, username, date });

        this.$chatBox.append($message);
        this.$chatBox.scrollTop = this.$chatBox.scrollHeight;
    }

    private renderMessages(messages: any[]): void {
        messages.forEach((message) => this.renderMessage(message));
    }

    private listen(): void {
        this.socketChatService.onNewMessage.subscribe(this.renderMessage.bind(this));
    }
}