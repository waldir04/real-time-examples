import { Component } from '../../classes/component.class';
import { SseChatUserNameComponent } from './sse-chat-username.component';

export class SseChatComponent implements Component {

    public render(): void {
        new SseChatUserNameComponent().render();
    }
}