import * as http from 'http';
import * as Koa from 'koa';
import ApiRouter from './ApiRouter';
import {requestLogging} from '../middleware/requestLogging';
import {Service} from '../Service';

const SERVER_PORT = 8080;

export class Server {

  private readonly koa: Koa;
  private server: http.Server;

  constructor(service: Service) {
    this.koa = new Koa();
    this.koa.use(requestLogging);
    this.koa.use(new ApiRouter(service).routes());
  }

  start(port = SERVER_PORT): Promise<number> {
    return new Promise((resolve) => {
      this.server = this.koa.listen(port, () => resolve(port));
    });
  }

  stop(): Promise<void> {
    if (!this.server) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.server.close(() => resolve());
    });
  }
}
