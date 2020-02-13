import { $UserNameTemplate } from '../../templates/username.template';

import { AppService } from '../../services/app.service';
import { Component } from '../../classes/component.class';
import { UserService } from '../../services/user.service';
import { LongPollingChatRoomComponent } from './long-polling-chat-room.component';


export class LongPollingChatUserNameComponent implements Component {
    private $form: HTMLFormElement;
    private userService: UserService;
    private appService: AppService;

    constructor() {
        this.appService = AppService.getInstance();
        this.userService = UserService.getInstance();
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
        new LongPollingChatRoomComponent().render();    
    }

    private onSetUserName(): boolean {
        this.setUserName();
        this.goToChat();

        return false;
    }

    private setUserName(): void {
        const username = this.$form.username.value;

        this.userService.userName = username;
    }
}