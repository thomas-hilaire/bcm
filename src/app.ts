import {Server} from './Server';
import {Service} from './Service';

const server = new Server(new Service());
server.start()
    .then(port => console.log(`[Server] HTTP server is started on port ${port}`))
    .catch(error => console.log('[Server] Cannot start the HTTP server', error));

async function stopServer() {
    await server.stop();
    console.log('[Server] HTTP server is stopped');
}

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
