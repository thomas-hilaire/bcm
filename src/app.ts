import AirBeamProvider from './provider/AirBeamProvider';
import AirJazzProvider from './provider/AirJazzProvider';
import AirMoonProvider from './provider/AirMoonProvider';
import {Server} from './Server';
import {Service} from './Service';

const providers = [
    new AirBeamProvider(),
    new AirMoonProvider(),
    new AirJazzProvider(),
];

const server = new Server(new Service(providers));
server.start()
    .then(port => console.log(`[Server] HTTP server is started on port ${port}`))
    .catch(error => console.log('[Server] Cannot start the HTTP server', error));

async function stopServer() {
    await server.stop();
    console.log('[Server] HTTP server is stopped');
}

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
