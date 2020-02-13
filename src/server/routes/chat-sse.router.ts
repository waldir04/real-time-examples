import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ChatSseController } from '../controllers/chat-sse.controller';

const chatSseRouter = express.Router();
const chatSseController = new ChatSseController();

chatSseRouter.post('/message', bodyParser.json(), (req: express.Request, res: express.Response) => {
    chatSseController.onMessage(req, res);
});

chatSseRouter.get('/subscribe/:id', (req: express.Request, res: express.Response) => {
    chatSseController.onSubscribe(req, res);
});

export default chatSseRouter;