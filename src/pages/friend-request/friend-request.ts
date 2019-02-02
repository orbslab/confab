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

  accept(id, sender, reciver) {
    console.log("Request For Add Friend");
    this.http.get<{message: string, info: any}>('http://localhost:3000/confab/addfriend/'+sender+'/'+reciver)
    .subscribe(res => {
      this.http.get<{message: string, info: any}>('http://localhost:3000/confab/addfriend/'+reciver+'/'+sender)
      .subscribe(res => {
        this.http.delete('http://localhost:3000/confab/addfriend/'+id)
        .subscribe(data => {
          const users = {
            user1: sender, 
            user2: reciver
          };
          this.http.post<{msg: string}>('http://localhost:3000/confab/createpm/', users)
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
    this.http.delete('http://localhost:3000/confab/addfriend/'+id)
    .subscribe(data => {
      this.friendRequestService.getRequests(this.sender)
      .subscribe(data => {
        this.friendRequests = data.info;
      });
    });
  }
}
