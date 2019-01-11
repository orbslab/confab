import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { FriendsListServices } from '../../services/friendsList.service';

@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage implements OnInit {

  friendProfile;
  friend;


  constructor(private friendListService: FriendsListServices,
              private navParams: NavParams,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.friendProfile = this.friendListService.friends;
    this.friend = this.navParams.data;
  }

  chatsPage() {
    this.navCtrl.popToRoot();
  }


}
