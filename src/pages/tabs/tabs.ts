import { Component } from "@angular/core";
import { ChatsPage } from "../chats/chats";
import { SearchPage } from "../search/search";
import { FriendRequestPage } from '../friend-request/friend-request';
import { GroupPage } from "../group/group";
import { AuthServiceProvider } from "../../services/auth.service";

@Component({
    selector: 'page-tabs',
    template: `
        <ion-tabs color="confab">
            <ion-tab [root]="chatsPage" tabTitle="Chats" tabIcon="chatbubbles"></ion-tab>
            <ion-tab [root]="groupPage" tabTitle="Groups" tabIcon="people"></ion-tab>
            <ion-tab [root]="searchPage" tabTitle="Search" tabIcon="search"></ion-tab>
            <ion-tab [root]="friendRequest" tabTitle="Friends" tabIcon="person-add"></ion-tab>
        </ion-tabs>
    `
})

export class TabsPage{
    chatsPage = ChatsPage;
    groupPage = GroupPage;
    searchPage = SearchPage;
    friendRequest = FriendRequestPage

    constructor(private auth: AuthServiceProvider) {
        console.log(this.auth.getUserInfo().email);
    }
}