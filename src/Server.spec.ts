import {expect} from 'chai';
import {get} from 'http';
import {Server} from './Server';
import {Service} from './Service';

const TEST_PORT = 18080;
const SERVER_URL = `http://localhost:${TEST_PORT}`;

describe('Server', () => {

  let server: Server;

  before(() => {
    server = new Server(new Service());
    return server.start(TEST_PORT);
  });

  after(() => {
    return server.stop();
  });

  it('should listen on the expected port when started', (done) => {
    get(SERVER_URL, () => done());
  });

  it('should send a 404 when no url match', (done) => {
    get(SERVER_URL, (res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

});
