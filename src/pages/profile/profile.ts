import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AlertController } from 'ionic-angular';
import { FriendsListPage } from '../friends-list/friends-list';
import { AuthServiceProvider } from '../../services/auth.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = [];
  email = this.auth.getUserInfo().email;
  friendsList = FriendsListPage;

  constructor (
    public profileService: ProfileService,
    public alertCtrl: AlertController,
    private auth: AuthServiceProvider
  ) {
    this.profileService.getProfile(this.email)
    .subscribe(data => {
      this.profile = data.info;
      console.log(data.info);
    });
  }

  editName() {
    let editName = this.alertCtrl.create({
      title: 'Edit Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
              this.profileService.editProfile(this.email, 'name', data.name);
          }
        }
      ]
    });
    editName.present();
  }
  editBio() {
    let editBio = this.alertCtrl.create({
      title: 'Edit Bio',
      inputs: [
        {
          name: 'bio',
          placeholder: 'Bio'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.profileService.editProfile(this.email, 'bio', data.bio);
          }
        }
      ]
    });
    editBio.present();
  }
  
  addInterest() {
    let prompt = this.alertCtrl.create({
      title: 'Add Interest',
      message: "Enter your interest",
      inputs: [
        {
          name: 'interest',
          placeholder: 'Interest'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.profileService.insertInterest(this.email, data.interest);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteInterest(interest) {
    const deleteInterest = this.alertCtrl.create({
      title: 'Deleting Interest',
      message: 'Are you sure that you wnat to delete your interest?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.profileService.deleteInterest(this.email, interest);
          }
        }
      ]
    });
    deleteInterest.present();
  }

}
