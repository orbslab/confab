
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GroupPage } from './../pages/group/group';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chats/chat/chat';
import { SearchPage } from '../pages/search/search';
import { ChatsServices } from '../services/chats';
import { ChatServices } from '../services/chat';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileService } from '../services/profile.service';
import { SuggestionService } from '../services/suggestion.service';
import { AboutPage } from '../pages/about/about';
import { FriendRequestService } from '../services/friendRequest.service';
import { FriendRequestPage } from '../pages/friend-request/friend-request';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../services/auth.service';
import { GroupServices } from '../services/group.service';
import { GroupChatPage } from '../pages/group/group-chat/group-chat';
import { GroupChatServices } from '../services/groupchat.service';
import { FriendsListPage } from '../pages/friends-list/friends-list';
import { FriendProfilePage } from '../pages/friend-profile/friend-profile';
import { FriendsListServices } from '../services/friendsList.service';

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    TabsPage,
    ProfilePage,
    ChatPage,
    GroupPage,
    GroupChatPage,
    SearchPage,
    AboutPage,
    FriendRequestPage,
    FriendsListPage,
    FriendProfilePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    TabsPage,
    ProfilePage,
    ChatPage,
    GroupPage,
    GroupChatPage,
    SearchPage,
    AboutPage,
    FriendRequestPage,
    FriendsListPage,
    FriendProfilePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ChatsServices,
    ChatServices,
    GroupServices,
    GroupChatServices,
    ProfileService,
    SuggestionService,
    FriendRequestService,
    FriendsListServices,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
