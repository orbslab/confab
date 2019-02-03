import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient) {}
    
    getProfile(email) {
        return this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/profile/'+ email);
    }

    editProfile(email, type, value) {
        this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/upprofile/'+email+'/'+type+'/'+value)
        .subscribe(res => {
            console.log(res.message);
        });
    }

    insertInterest(email, value) {
        this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/upinterest/'+email+'/'+value)
        .subscribe(res => {
            console.log(res.message);
        });
    }

    deleteInterest(email, value){
        this.http.get<{message: string, info: any}>('https://appconfab.herokuapp.com/confab/delinterest/'+email+'/'+value)
        .subscribe(res => {
            console.log(res.message);
        });
    }
}