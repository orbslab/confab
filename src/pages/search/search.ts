import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { SuggestionService } from '../../services/suggestion.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceProvider } from '../../services/auth.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  suggestions;
  search = '';
  searchRes;
  usrInterests = this.auth.getUserInfo().interests;
 
  constructor(public alerCtrl: AlertController,
    public suggestionService: SuggestionService,
    public http: HttpClient,
    private auth: AuthServiceProvider
  ) {
      this.suggestionService.getSuggestion(this.usrInterests)
      .subscribe(data => {
        this.suggestions = data.info;
      });
    }

    onChange() {
      this.http.get<{message: string, info: any}>('http://localhost:3000/confab/search/'+ this.search)
      .subscribe(res => {
        this.searchRes = res.info;
      })

      this.search = '';
    }

    connect(reqReciver) {
      console.log(reqReciver);
      const info = {sender: this.auth.getUserInfo().email, senname: this.auth.getUserInfo().name, senbio: this.auth.getUserInfo().bio, reciver: reqReciver};
      this.http.post<{msg: string}>('http://localhost:3000/confab/friendrequest/', info)
      .subscribe((doc) => {
        console.log(doc.msg);
      },
      error => {
        console.log(error);
      });
    }

}
