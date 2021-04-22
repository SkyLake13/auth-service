import { Server } from "http";
import socketIo from 'socket.io';
import ValueService from "../express-app/services/value.service";


export default class SocketIOApp {
    private io: SocketIO.Server;

    constructor(server: Server, private valueService: ValueService) {
        this.io = socketIo(server);
        this.io.on('connection', this.onClientConnected.bind(this));
    }

    private onClientConnected(socket: socketIo.Socket) {
        this.sendInitialMessage();

        socket.on('message', this.onMessage.bind(this));

        socket.on('disconnect', this.onDisconnect.bind(this));
    }

    private onMessage(msg: string) {
        this.sendMessage(msg);
    }

    private sendMessage(msg: string) {
        this.io.emit('message', 'Received Message: ', msg);
    }

    private sendInitialMessage() {
        this.io.emit('message', 'Hello there!!!');
    }

    private onDisconnect() {
        console.log('Client disconnected');
    }
}