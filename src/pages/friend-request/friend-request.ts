import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../services/friendRequest.service';

@Component({
  selector: 'page-friend-request',
  templateUrl: 'friend-request.html',
})
export class FriendRequestPage implements OnInit {

  friendRequests;

  constructor(private friendRequestService: FriendRequestService) {
  }

  ngOnInit() {
    this.friendRequests = this.friendRequestService.friendRequset;
  }
  
}
