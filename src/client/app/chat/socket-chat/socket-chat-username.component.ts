import { $UserNameTemplate } from '../../templates/username.template';

import { AppService } from '../../services/app.service';
import { Component } from '../../classes/component.class';
import { SocketChatService } from '../../services/socket-chat.service';
import { UserService } from '../../services/user.service';
import { SocketChatRoomComponent } from './socket-chat-room.component';

export class SocketChatUserNameComponent implements Component {
    private $form: HTMLFormElement;
    private userService: UserService;
    private socketChatService: SocketChatService;
    private appService: AppService;

    constructor() {
        this.appService = AppService.getInstance();
        this.userService = UserService.getInstance();
        this.socketChatService = SocketChatService.getInstance();
    }

    public render(): void {
        this.appService.render($UserNameTemplate);
        this.initialize();
    }

    public initialize(): void {
        this.$form = document.getElementById('username-form') as HTMLFormElement;
        this.$form.onsubmit = this.onSetUserName.bind(this);
    }

    private goToChat(): void {
        new SocketChatRoomComponent().render();    
    }

    private onSetUserName(): boolean {
        this.setUserName();
        this.goToChat();

        return false;
    }

    private setUserName(): void {
        const username = this.$form.username.value;

        this.userService.userName = username;
        this.registerUserName(username);
    }

    private registerUserName(username: string): void {
        this.socketChatService.register(username);
    }
}