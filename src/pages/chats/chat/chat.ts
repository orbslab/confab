import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from "@angular/core";
import { ChatServices } from "../../../services/chat";
import { NavParams } from "ionic-angular";
import { AuthServiceProvider } from "../../../services/auth.service";

@Component({
  selector: 'page-chat',
  templateUrl: './chat.html'
})
export class ChatPage implements OnInit, AfterViewChecked{
  messages = [];
  message = '';
  chatId: string;
  email = this.auth.getUserInfo().email;

  constructor (
    private chatServices: ChatServices,
    private navParams: NavParams,
    private auth: AuthServiceProvider
  ) {
    console.log(this.email);
    this.chatServices.newMessage()
    .subscribe(data => {
      this.messages.push(data);
    });
  }
  
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    // method used to enable scrolling
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
  
  ngOnInit() {
    this.chatId = this.navParams.data.ctId;
    this.oldMessage();
    this.join();
  }

  join() {
    this.chatServices.joinChat({chatId: this.chatId, sender: this.auth.getUserInfo().name, sid: this.auth.getUserInfo().email});
  }

  oldMessage() {
    this.chatServices.getMessages(this.chatId)
    .subscribe((userData) => {
      return this.messages = userData.info;
    },
    error => {
      console.log(error);
    });
  }

  sendMessage(){
    if(this.message === ''){
      return;
    }
    else {
      this.chatServices.sendMsg(this.chatId, this.auth.getUserInfo().name, this.auth.getUserInfo().email, this.message);
      this.message = '';
    }
  }

  chatName() {
    if(this.email == this.navParams.data.user1) {
      return this.navParams.data.username2;
    } else if(this.email == this.navParams.data.user2) {
      return this.navParams.data.username1;
    }
  }
}
