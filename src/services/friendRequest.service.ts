import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendRequestService {
    constructor(private http: HttpClient) {}

    getRequests(email) {
        return this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/friendrequest/'+ email);
    }
}