import {Server} from './Server';

const server = new Server();
server.start()
    .then(() => console.log('[Server] HTTP server is started'))
    .catch(error => console.log('[Server] Cannot start the HTTP server', error));

async function stopServer() {
    await server.stop();
    console.log('[Server] HTTP server is stopped');
}

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
