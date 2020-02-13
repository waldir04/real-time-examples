import * as express from 'express';

import { ChatController } from './../controllers/chat.controller';

const chatRouter = express.Router();
const chatController = new ChatController();

chatRouter.post('/publish', (req: express.Request, res: express.Response) => {
    chatController.onPublish(req, res);
});

chatRouter.get('/messages', (req: express.Request, res: express.Response) => {
    chatController.getMessages(req, res);
});

chatRouter.get('/subscribe', (req: express.Request, res: express.Response) => {
    chatController.onSubscribe(req, res);
});

export default chatRouter;