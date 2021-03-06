import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  constructor(private logger: Logger) {
    this.logger = new Logger('AppGateway');
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('AppGateway initialized');
    server.emit('Web socket server initialized');
  }

  @SubscribeMessage('messageFromClient')
  handleMessage(_client: Socket, payload: string): void {
    this.server.emit('messageFromServer', payload);
  }
}
