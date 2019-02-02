import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from "@angular/core";
import { GroupChatServices } from "../../../services/groupchat.service";
import { NavParams } from "ionic-angular";
import { AuthServiceProvider } from "../../../services/auth.service";

@Component({
  selector: 'page-group-chat',
  templateUrl: './group-chat.html'
})
export class GroupChatPage implements OnInit, AfterViewChecked {

  messages = [];
  message = '';
  gId;
  email = this.auth.getUserInfo().email;

  constructor (
    private groupChatServices: GroupChatServices,
    private navParams: NavParams,
    private auth: AuthServiceProvider
  ) {
    this.groupChatServices.newMessage()
    .subscribe(data => {
      this.messages.push(data);
      console.log(data);
    });
  }

  ngOnInit() {
    this.gId = this.navParams.data;
    this.oldMessage();
    this.join();
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    // method used to enable scrolling
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  join() {
    this.groupChatServices.joinGroup({gId: this.gId, sender: this.auth.getUserInfo().name, email: this.auth.getUserInfo().email});
  }

  oldMessage() {
    this.groupChatServices.getMessages(this.gId)
    .subscribe((userData) => {
      console.log(userData.info);
      return this.messages = userData.info;
    },
    error => {
      console.log(error);
    });
  }

  sendMessage() {
    if(this.message === ''){
      return;
    }
    else {
      this.groupChatServices.sendMsg(this.gId, this.auth.getUserInfo().name, this.auth.getUserInfo().email, this.message);
      this.message = '';
    }
  }

}
