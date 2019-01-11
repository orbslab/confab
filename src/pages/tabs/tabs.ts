import { Component } from "@angular/core";
import { ChatsPage } from "../chats/chats";
import { SearchPage } from "../search/search";
import { GroupPage } from "../group/group";

@Component({
    selector: 'page-tabs',
    template: `
        <ion-tabs color="confab">
            <ion-tab [root]="chatsPage" tabTitle="Chats" tabIcon="chatbubbles"></ion-tab>
            <ion-tab [root]="groupPage" tabTitle="Groups" tabIcon="people"></ion-tab>
            <ion-tab [root]="searchPage" tabTitle="Search" tabIcon="search"></ion-tab>
        </ion-tabs>
    `
})

export class TabsPage{
    chatsPage = ChatsPage;
    groupPage = GroupPage;
    searchPage = SearchPage;

}