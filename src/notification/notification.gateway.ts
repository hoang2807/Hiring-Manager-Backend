import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationGateway.name);
  clients: Socket[] = [];
  counter = 0;

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client id: ${client.id} disconnected`);
    this.clients.splice(
      this.clients.findIndex((c) => {
        return c.id === client.id;
      }),
      1,
    );
  }

  @SubscribeMessage('ping')
  handleMessage(client: any, payload: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);
    return {
      event: 'pong',
      data: payload,
    };
  }

  emitSendNotification(id: number, text: string): void {
    this.clients.forEach((c) => c.emit(`notification-${id}`, 'hello'));
    this.io.sockets.emit(`notification-${id}`, 'hello');
  }
}
