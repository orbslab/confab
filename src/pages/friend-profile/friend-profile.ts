import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage implements OnInit {

  friendProfile;
  friend;


  constructor(private navParams: NavParams,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.friend = this.navParams.data;
  }

  chatsPage() {
    this.navCtrl.popToRoot();
  }


}
