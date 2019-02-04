import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { FriendProfilePage } from '../friend-profile/friend-profile';

@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html',
})
export class FriendsListPage{

  friendsarr = [];
  friends = [];
  getFriends = this.auth.getUserInfo().friends;

  constructor (
    private navCtrl: NavController,
    private auth: AuthServiceProvider,
    private profile: ProfileService
  ) {
    for(let value of this.getFriends) {
      this.profile.getProfile(value)
      .subscribe(res => {
        this.friends.push({email: res.info.email, name: res.info.name});
      });
    }
  }

  chatsPage() {
    this.navCtrl.popToRoot();
  }

  friendProfile(email) {
    console.log(email);
    this.navCtrl.push(FriendProfilePage, email);
  }

  doRefresh(event) {
    for(let value of this.getFriends) {
      this.profile.getProfile(value)
      .subscribe(res => {
        this.friends.push({email: res.info.email, name: res.info.name});
      });
    }
    event.complete();
  }

}
