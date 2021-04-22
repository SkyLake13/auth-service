import { createServer } from 'http';

import ExpressApp from './express-app/express.app';
import SocketIOApp from './socketIO-app/socketIO.app';

import ValueService from './express-app/services/value.service';

const valueService = new ValueService();
const expressApp = new ExpressApp(valueService)

const server = createServer(expressApp.express)

const socketApp = new SocketIOApp(server, valueService);

server.listen('4300', () => {
    console.log('Listening at 4300');
});