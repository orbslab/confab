import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupServices } from '../../services/group.service';
import { GroupChatPage } from '../group/group-chat/group-chat';
 
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage implements OnInit {

  groups;

  constructor(public navCtrl: NavController,
              private groupService: GroupServices) {
  }

  ngOnInit() {
    this.groups = this.groupService.group;
  }
  groupChatPage(name, img) {
    this.navCtrl.push(GroupChatPage, {userName: name, userImg: img});
  }

}
