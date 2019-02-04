import { Component } from '@angular/core';
import { FriendsListPage } from '../friends-list/friends-list';
import { FriendRequestService } from '../../services/friendRequest.service';
import { AuthServiceProvider } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-friend-request',
  templateUrl: 'friend-request.html',
})
export class FriendRequestPage {

  friendRequests;
  sender = this.auth.getUserInfo().email;
  sendername = this.auth.getUserInfo().name;
  friendsList = FriendsListPage;

  constructor(
    private friendRequestService: FriendRequestService,
    private auth: AuthServiceProvider,
    private http: HttpClient
  ) {
    this.friendRequestService.getRequests(this.sender)
    .subscribe(data => {
      this.friendRequests = data.info;
    });
  }

  accept(id, sender, sendername, reciver, recivername) {
    console.log("Request For Add Friend");
    this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/addfriend/'+sender+'/'+reciver)
    .subscribe(res => {
      this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/addfriend/'+reciver+'/'+sender)
      .subscribe(res => {
        this.http.delete('https://appconfab.herokuapp.com/confab/addfriend/'+id)
        .subscribe(data => {
          const users = {
            user1: sender,
            username1: sendername,
            user2: reciver,
            username2: recivername
          };
          this.http.post<{msg: string}>('https://appconfab.herokuapp.com/confab/createpm/', users)
          .subscribe(success => {
            this.friendRequestService.getRequests(this.sender)
            .subscribe(data => {
              this.friendRequests = data.info;
            });
          });
        });
      });
    });
  }

  ignor(id) {
    this.http.delete('https://appconfab.herokuapp.com/confab/addfriend/'+id)
    .subscribe(data => {
      this.friendRequestService.getRequests(this.sender)
      .subscribe(data => {
        this.friendRequests = data.info;
      });
    });
  }

  doRefresh(event) {
    this.friendRequestService.getRequests(this.sender)
    .subscribe(data => {
      this.friendRequests = data.info;
      event.complete();
    });
  }
}
