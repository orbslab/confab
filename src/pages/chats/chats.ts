import {Component, OnInit} from "@angular/core";
import {ChatsServices} from "../../services/chats";
import {ChatPage} from "./chat/chat";
import { ProfilePage } from "../profile/profile";
import { AboutPage } from "../about/about";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-chat',
  templateUrl: './chat.html'
})
export class ChatsPage implements OnInit{
  chats;
  // chatPage = ChatPage;
  profilePage = ProfilePage;
  aboutPabe = AboutPage;
  constructor(private chatsService: ChatsServices,
              private navCtrl: NavController) {}

  ngOnInit(){
    this.chats = this.chatsService.chats;
  }
  chatpage(name, img) {
    this.navCtrl.push(ChatPage, {userName: name, userImg: img});
  }
}
