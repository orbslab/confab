import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {GroupChatServices} from "../../../services/groupchat.service";
import { NavParams } from "ionic-angular";

@Component({
  selector: 'page-group-chat',
  templateUrl: './group-chat.html'
})
export class GroupChatPage implements OnInit, AfterViewChecked{
  messages = [];
  message = '';
  user;
  constructor(private groupChatServices: GroupChatServices,
              private navParams: NavParams) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit() {
    this.messages = this.groupChatServices.messages;
    this.user = this.navParams.data;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    // method used to enable scrolling
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
}

  sendMessage(){
    if(this.message === ''){
      return;
    }
    else {
      this.groupChatServices.recieveMsg(this.message);
      this.message = '';
    }
  }


}
