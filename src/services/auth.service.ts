import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class User {
  name: string;
  email: string;
  bio: string;
  interests;
  friends;

  constructor(name: string, email: string, bio: string, interests, friends) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.interests = interests;
    this.friends = friends;
  }
}
@Injectable()
export class AuthServiceProvider {
  currentUser: User = null;

  constructor(public http: HttpClient) {}

  UserInfo(name, email, bio, interests, friends) {
    this.currentUser = new User(name, email, bio, interests, friends);
  }

  getUserInfo() : User {
    return this.currentUser;
  }
}