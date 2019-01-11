import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {ChatServices} from "../../../services/chat";
import { NavParams } from "ionic-angular";

@Component({
  selector: 'page-chat',
  templateUrl: './chat.html'
})
export class ChatPage implements OnInit, AfterViewChecked{
  messages = [];
  message = '';
  user;
  constructor(private chatServices: ChatServices,
              private navParams: NavParams) {}
  
  
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() {
    this.messages = this.chatServices.messages;
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
      this.chatServices.recieveMsg(this.message);
      this.message = '';
    }
    // this.contentArea.scrollToBottom();
  }


}
