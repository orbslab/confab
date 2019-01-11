import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { SuggestionService } from '../../services/suggestion.service';
import { FriendRequestPage } from '../friend-request/friend-request';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {

  suggestions;
  friendRequest = FriendRequestPage;
 
  constructor(public alerCtrl: AlertController,
    public suggestionService: SuggestionService) { }

    ngOnInit() {
      this.suggestions = this.suggestionService.suggestions;
    }

}
