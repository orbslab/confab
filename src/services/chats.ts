import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatsServices {
  constructor(private http: HttpClient) {}

  getChats(email) {
    return this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/pmlist/'+ email);
  }
}
