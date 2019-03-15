import {Context} from 'koa';
import * as Router from 'koa-router';
import {Service} from './Service';

export default class ApiRouter {

    private readonly service: Service;
    private readonly router: Router;

    constructor(service: Service) {
        this.service = service;
        this.router = new Router()
           .get('/api/flights', ctx => this.collectFlights(ctx));
    }

    async collectFlights(ctx: Context) {
        ctx.body = await this.service.fetchFlights();
    }

    routes() {
        return this.router.routes();
    }
}
