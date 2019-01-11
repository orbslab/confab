import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FriendsListServices } from '../../services/friendsList.service';
import { FriendProfilePage } from '../friend-profile/friend-profile';

@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html',
})
export class FriendsListPage implements OnInit{

  friends;
  friendProfile = FriendProfilePage;

  constructor(private friendsListService: FriendsListServices,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.friends = this.friendsListService.friends;
  }

  friendProfilePage(img, name, bio, interest, contact) {
    this.navCtrl.push(FriendProfilePage, {friendImg: img, friendName: name, friendBio: bio, friendInterest: interest, friendContact: contact});
  }

  chatsPage() {
    this.navCtrl.popToRoot();
  }

}
