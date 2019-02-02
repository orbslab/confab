import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SuggestionService {
    constructor(private http: HttpClient) {}

    getSuggestion(value) {
        return this.http.get<{message: string, info: any}>('http://appconfab.herokuapp.com/confab/suggestion/'+ value);
    }
}