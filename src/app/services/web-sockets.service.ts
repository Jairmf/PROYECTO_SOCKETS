import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
// import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService extends Socket {

  // socket: any;
  // server = io("http://localhost:3000");
  outEven: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url: "http://localhost:3000",
      options: {
        allowEIO3: true // false by default
      }
      // options: {transports: ['websocket']}
    });
    // this.socket = this.server;
  }

  listen(eventName: string) {
    return new Observable((Subscriber) => {
      this.ioSocket.on(eventName, (data: any) => {
        console.log("listen");
        console.log(data);
        Subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    console.log("emit");
    console.log(data);
    this.ioSocket.emit(eventName, data);
  }

  // socket: any;
  // server = io("http://localhost:3000", {transports: ['websocket']});

  // constructor() {
  //   this.socket = this.server;
  // }

  // listen(eventName: string) {
  //   return new Observable((Subscriber) => {
  //     this.socket.on(eventName, (data: any) => {
  //       Subscriber.next(data);
  //     })
  //   })
  // }

  // emit(eventName: string, data: any) {
  //   this.socket.emit(eventName, data);
  // }

}
