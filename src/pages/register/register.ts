import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController, AlertController, IonicPage, LoadingController, Loading } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', bio: 'Write Your Bio Here!'};
  loading: Loading;
 
  constructor (
    private nav: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    ) {}
 
  public register() {
    this.showLoading();
    
    const user = {
      name: this.registerCredentials.name, 
      email: this.registerCredentials.email, 
      password: this.registerCredentials.password,
      bio: this.registerCredentials.bio
    };

    this.http.post<{message: string}>('http://localhost:3000/confab/users/', user)
    .subscribe((success) => {
      if(success) {
        this.stopLoading();
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.stopLoading();
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.stopLoading();
        this.showPopup("Error", error);
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

  stopLoading() {
    this.loading.dismiss();
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(alert);
  }
}