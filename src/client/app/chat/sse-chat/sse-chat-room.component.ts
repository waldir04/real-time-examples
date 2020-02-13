import { $ChatTemplate } from '../../templates/chat.template';
import { Component } from '../../classes/component.class';
import { AppService } from '../../services/app.service';
import { ChatService } from '../../services/chat.service';
import { SseChatService } from '../../services/sse-chat.service';
import { UserService } from '../../services/user.service';
import { ChatUtil } from '../../utils/chat.util';
import { MessageModel } from '../../../../server/interfaces/message.model';

export class SseChatRoomComponent implements Component {
    private $form: HTMLFormElement;
    private $chatBox: HTMLElement;
    private appService: AppService;
    private chatService: ChatService;
    private sseChatService: SseChatService;
    private userService: UserService;

    constructor() {
        this.appService = AppService.getInstance();
        this.chatService = ChatService.getInstance();
        this.sseChatService = SseChatService.getInstance();
        this.userService = UserService.getInstance();
    }

    public render(): void {
        this.appService.render($ChatTemplate); 
        this.initialize();
    }

    public initialize(): void {
        this.initializeElements();
        this.getMessages();
        this.listen();
    }

    private initializeElements(): void {
        this.$chatBox = document.getElementById('chat-box');
        this.$form = document.getElementById('publish') as HTMLFormElement;
        this.$form.onsubmit = this.sendMessage.bind(this);
    }

    private getMessages(): void {
        this.chatService.getMessages()
        .then((response) => this.renderMessages(response));
    }

    private sendMessage(): boolean {
        const message = this.$form.message.value;
        const username = this.userService.userName;

        this.$form.message.value = '';
        
        this.sseChatService.sendMessage(message, username);

        return false;
    }

    private renderMessage({ message, username, date }: MessageModel): void {
        const $message = new ChatUtil().renderMessage({ message, username, date });

        this.$chatBox.append($message);
        this.$chatBox.scrollTop = this.$chatBox.scrollHeight;
    }

    private renderMessages(messages: MessageModel[]): void {
        messages.forEach((message) => this.renderMessage(message));
    }

    private listen(): void {
        this.sseChatService.onNewMessage
            .subscribe(this.renderMessage.bind(this));
    }
}