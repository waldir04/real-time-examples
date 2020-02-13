import * as express from 'express';
import * as socketIo from 'socket.io';
import * as cors from 'cors';
import { createServer, Server as ServerHttp } from 'http';

import { App } from '../constants/app.const';
import { ServiceClass } from '../classes/service.class';

export class Server extends ServiceClass {
    public  io: SocketIO.Server;

    public readonly app: express.Application;
    public readonly portHttp: number;
    public readonly portSocket: number;

    private server: ServerHttp;

    private constructor() {
        super();
        this.app = express();
        this.app.use(cors());
        this.portHttp = App.HTTP_PORT;
        this.portSocket = App.SOCKETPORT;
    }

    public startHttp(): void {
        this.listenHttpServer();
    }

    public startSocket(): void {
        this.createSocketServer();
        this.listenSocketServer();
    }

    private listenHttpServer(): void {
        this.app.listen(this.portHttp, () => console.log(`Http listening on port ${this.portHttp}!`));
    }

    private listenSocketServer(): void {
        this.server.listen(this.portSocket, () => console.log(`Socket listening on port ${this.portSocket}!`));
    }

    private createSocketServer(): void {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private setCors(): void {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, goggle.com');        
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');        
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            next();
        });
    }
}