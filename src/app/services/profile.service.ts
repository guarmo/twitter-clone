import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IProfile, ITweet } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile = new Subject<IProfile>();
  profileFeed = new Subject<ITweet[]>();

  constructor(private http: HttpClient) {}

  fetchUser() {
    this.http
      .get<IProfile>(`http://localhost:3000/users/1`)
      .subscribe(
        (response) => {
          this.profile.next(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchProfileFeed() {
    this.http.get<ITweet[]>('http://localhost:3000/profileFeed').subscribe(
      (response) => {
        this.profileFeed.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
