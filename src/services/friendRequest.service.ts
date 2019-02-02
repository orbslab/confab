import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FriendRequestService {
    constructor(private http: HttpClient) {}

    getRequests(email) {
        return this.http.get<{message: string, info: any}>('http://localhost:3000/confab/friendrequest/'+ email);
    }
}