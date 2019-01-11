import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AlertController } from 'ionic-angular';
import { FriendsListPage } from '../friends-list/friends-list';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  profile;
  friendsList = FriendsListPage;

  constructor(public profileService: ProfileService,
    public alertCtrl: AlertController) {}

  ngOnInit() {
    this.profile = this.profileService.profiles;
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
              this.profileService.updateName(data.name);
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
            this.profileService.updateBio(data.bio);
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
            this.profileService.insertInterest(data.interest);
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
            this.profileService.deleteInterest(interest);
          }
        }
      ]
    });
    deleteInterest.present();
  }

}
