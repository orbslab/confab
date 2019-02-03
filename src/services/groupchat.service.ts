import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/observable';

@Injectable()
export class GroupChatServices {
  constructor(private http: HttpClient) {}

  private socket = io('http://appconfab.herokuapp.com/');

  messages = [];

  joinGroup(data) {
    this.socket.emit('join', data);
  }

  getMessages(groupId) {
    return this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/groupChat/'+ groupId);
  }

  sendMsg(gId: string, senderInfo: string, userEmail: string, userMsg: string){
    const txt = {gid: gId, sender: senderInfo, email: userEmail, message: userMsg};
    this.http.post<{msg: string}>('https://appconfab.herokuapp.com/confab/groupChat/', txt)
    .subscribe((doc) => {
      this.messages.push(txt);
      console.log(doc.msg);
    },
    error => {
      console.log(error);
    });

    console.log(txt);
    this.socket.emit('message', txt);
  }

  newMessage() {
    let observable = new Observable<{sender: string, message: string}>(observable => {
      this.socket.on('new message', (data) => {
        observable.next(data);
      });
    });

    console.log(observable);
    return observable;
  }
}
  