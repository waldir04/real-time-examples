import * as Mustache from 'mustache';

import { UserService } from './../services/user.service';
import { $ChatMessageTemplate } from '../templates/chat-message.template';
import { ChatImages } from '../constants/chat-images.const';
import { MessageModel } from '../../../server/interfaces/message.model';

export class ChatUtil {
    private userService: UserService;
    private $message: string;

    constructor() {
        this.userService = UserService.getInstance();
        this.$message = $ChatMessageTemplate;
    }

    public renderMessage(data: MessageModel): ChildNode {
        const { username, message, date } = data;

        const currentUser = this.userService.userName;
        const side = username === currentUser ? 'right' : 'left';
        const img = (side === 'right') ? ChatImages['left'] : ChatImages['right'];
        const messageContainer = document.createElement('div');
    
        const messageRow = Mustache.render(this.$message, { 
            side, 
            username, 
            message,
            img,
            date: this.formatDate(date)
        });

        messageContainer.innerHTML = messageRow;

        return messageContainer.firstChild;
    }

    public formatDate(stringDate: string): string {
        const date = new Date(stringDate);
        const h = `0${date.getHours()}`;
        const m = `0${date.getMinutes()}`;

        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
}