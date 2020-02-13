import './../assets/styles.scss';

import { AppService } from './services/app.service';
import { SseChatComponent } from './chat/sse-chat/sse-chat.component';

AppService
    .getInstance()
    .initialize(document.getElementById('app'), SseChatComponent);