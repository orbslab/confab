import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage implements OnInit {

  friendProfile;
  friend = [];
  email;


  constructor ( 
    private navParams: NavParams,
    private navCtrl: NavController,
    private profileService: ProfileService
  ) {
    this.profileService.getProfile(this.navParams.data)
    .subscribe(res => {
      console.log(res.info);
      this.friend = res.info;
    });
  }

  ngOnInit() {
    console.log(this.friend);
  }

  chatsPage() {
    this.navCtrl.popToRoot();
  }

  doRefresh(event) {
    this.profileService.getProfile(this.navParams.data)
    .subscribe(data => {
      this.friend = data.info;
      event.complete();
    });
  }


}
