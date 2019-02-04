import { Component } from "@angular/core";
import { ChatsServices } from "../../services/chats";
import { ChatPage } from "./chat/chat";
import { ProfilePage } from "../profile/profile";
import { AboutPage } from "../about/about";
import { NavController } from "ionic-angular";
import { AuthServiceProvider } from "../../services/auth.service";

@Component({
  selector: 'page-chat',
  templateUrl: './chat.html'
})
export class ChatsPage {
  chats;
  email = this.auth.getUserInfo().email;
  profilePage = ProfilePage;
  aboutPabe = AboutPage;

  constructor (
    private chatsService: ChatsServices,
    private navCtrl: NavController,
    private auth: AuthServiceProvider
  ) {
    this.chatsService.getChats(this.email)
    .subscribe(res => {
      console.log(res.message);
      console.log(res.info);
      this.chats = res.info;
    });
  }

  chatName(user1, username1, user2, username2) {
    if(this.email == user1) {
      return username2;
    } else if(this.email == user2) {
      return username1;
    }
  }
  
  chatpage(chatId) {
    this.navCtrl.push(ChatPage, chatId);
  }

  doRefresh(event) {
    this.chatsService.getChats(this.email)
    .subscribe(res => {
      console.log(res.message);
      this.chats = res.info;
      event.complete();
    });
  }
}
