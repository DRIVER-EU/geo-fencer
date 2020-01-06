import { RuleFired } from './../models/rest/rest-models';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
  import { Client, Server } from 'socket.io';

// @WebSocketGateway(3001, { namespace: 'notifications' })
@WebSocketGateway(9995)
export class NotificationService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer()
    server: Server;

    wsClients: Client[] = [];

    constructor() {
        console.log(`Notification service started; listening at port 9995`);
    }

    afterInit() {

    }

    handleConnection(client: Client) {
        console.log(`New connection from: ${client.id}`);
        this.wsClients.push(client);
      }

      private Broadcast(event: any, message: any) {
        const broadCastMessage = JSON.stringify(message);
        for (let c of this.wsClients) {
            (c as any).emit(event, broadCastMessage);
        }
    }


      handleDisconnect(client: any) {
        for (let i = 0; i < this.wsClients.length; i++) {
          if (this.wsClients[i] === client) {
            this.wsClients.splice(i, 1);
            break;
          }
        }

      }

    public SendOnRuleFired(info: RuleFired) {
        this.Broadcast('ruleFired', info);
    }


}