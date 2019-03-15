import axios from 'axios';
import {expect} from 'chai';
import {SinonStub, stub} from 'sinon';
import {Server} from './Server';
import {Service} from './Service';

const TEST_PORT = 18080;
const HOST = 'localhost';
const ROUTE_URL = `http://${HOST}:${TEST_PORT}/api/flights`;

describe('/api route', () => {

    let service: Service;
    let server: Server;

    before(async () => {
        service = {
            fetchFlights: stub(),
        };
        server = new Server(service);

        await server.start(TEST_PORT);
    });

    after(() => {
        return server.stop();
    });

    describe('Given a GET on /api/flights', () => {
        it('should return the service results', async () => {
            const expectedResult = [{expected: 'result'}];
            (service.fetchFlights as SinonStub).resolves(expectedResult);

            const response = await axios.get(ROUTE_URL);

            expect(response.status).to.equal(200);
            expect(response.data).to.deep.equal(expectedResult);
        });
    });
});
