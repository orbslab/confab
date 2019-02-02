import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

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

}
