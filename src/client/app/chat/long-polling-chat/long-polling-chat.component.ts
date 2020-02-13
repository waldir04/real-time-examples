import { Component } from '../../classes/component.class';
import { LongPollingChatUserNameComponent } from './long-polling-chat-username.component';

export class LongPollingChatComponent implements Component {

    public render(): void {
        new LongPollingChatUserNameComponent().render();
    }
}