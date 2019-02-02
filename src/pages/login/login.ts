import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../services/auth.service';
import { HttpClient } from "@angular/common/http";
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tabsPage = TabsPage;
  registerPage = RegisterPage;
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  userName;
  userEmail;
  userBio;
  userInterests;
  userFriends;
 
  constructor (
    private nav: NavController, 
    private auth: AuthServiceProvider, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) {}
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }

  checkLogin() {
    if(this.userEmail != null) {
      console.log(this.userEmail);
      this.auth.UserInfo(this.userName, this.userEmail, this.userBio, this.userInterests, this.userFriends);
      this.nav.setRoot(TabsPage);
    } else {
      console.log(this.userEmail);
    }
  }

  public login() {
    this.showLoading();
    this.http.get<{message: string, info: any}>('http://appconfab.herokuapp.com/confab/users/'+ this.registerCredentials.email)
    .subscribe((userData) => {
      if(this.registerCredentials.password === userData.info.password && this.registerCredentials.email === userData.info.email) {
        this.auth.UserInfo(userData.info.name, userData.info.email, userData.info.bio, userData.info.interests, userData.info.friends);
        this.nav.setRoot(TabsPage);
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      console.log(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: `<img src="./../../assets/imgs/loader.gif"/>`,
      spinner: 'hide',
      cssClass: 'my-loading-class',
      dismissOnPageChange: true
    });
    this.loading.present();
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
