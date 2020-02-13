import './../assets/styles.scss';

import { LongPollingChatComponent } from './chat/long-polling-chat/long-polling-chat.component';
import { AppService } from './services/app.service';

AppService
    .getInstance()
    .initialize(document.getElementById('app'), LongPollingChatComponent);
