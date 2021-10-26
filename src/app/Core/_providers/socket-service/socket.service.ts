import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

// import {io} from 'socket.io-client';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // tslint:disable-next-line: typedef
  listen(Eventname: string) {
    return new Observable((subscriber) => {
      this.socket.on(Eventname, (data) => {
        subscriber.next(data);
      });
    });
  }
}
