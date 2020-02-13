import { SocketChatUserNameComponent } from './socket-chat-username.component';
import { Component } from '../../classes/component.class';

export class SocketChatComponent implements Component {

    public render(): void {
        new SocketChatUserNameComponent().render();
    }
}