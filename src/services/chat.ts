import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ChatServices {

  constructor(private http: HttpClient) {}

  private socket = io('https://appconfab.herokuapp.com/');

  messages = [];

  joinChat(data) {
    this.socket.emit('join pm', data);
  }

  getMessages(chatId) {
    return this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/privateChat/'+ chatId);
  }

  sendMsg(cId: string, senderInfo: string, sendEmail: string, userMsg: string){
    const txt = {chatId: cId, sender: senderInfo, email: sendEmail, message: userMsg};
    this.socket.emit('private message', txt);
    this.http.post<{msg: string}>('https://appconfab.herokuapp.com/confab/privateChat/', txt)
    .subscribe((doc) => {
      this.messages.push(txt);
      console.log(doc.msg);
    },
    error => {
      console.log(error);
    });

    console.log(txt);
  }

  newMessage() {
    let observable = new Observable<{sender: string, message: string}>(observable => {
      this.socket.on('new private message', (data) => {
        observable.next(data);
      });
    });

    console.log(observable);
    return observable;
  }
}
