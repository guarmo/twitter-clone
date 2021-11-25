import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IProfile, ITweet } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile = new Subject<IProfile>();
  feed = new Subject<ITweet[]>();

  constructor(private http: HttpClient) {}

  fetchUser() {
    this.http
      .get<IProfile>(`http://localhost:3000/users/1`)
      .pipe(tap((response) => console.log(response)))
      .subscribe(
        (response) => {
          this.profile.next(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchUserFeed() {
    this.http
      .get<ITweet[]>('http://localhost:3000/feed')
      .pipe(tap((response) => console.log(response)))
      .subscribe(
        (response) => {
          this.feed.next(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  fetchTweets() {
    this.http
      .get('http://localhost:3000/tweets')
      .pipe(tap((val) => console.log(val)))
      .subscribe();
  }
}
