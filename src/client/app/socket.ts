import './../assets/styles.scss';

import { AppService } from './services/app.service';
import { SocketChatComponent } from './chat/socket-chat/socket-chat.component';

AppService
    .getInstance()
    .initialize(document.getElementById('app'), SocketChatComponent);
