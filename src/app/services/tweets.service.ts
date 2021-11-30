import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ITweet } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  feed = new Subject<ITweet[]>();

  constructor(private http: HttpClient) { }

  fetchFeed() {
    this.http
      .get<ITweet[]>('http://localhost:3000/feed')
      // .pipe(tap((response) => console.log(response)))
      .subscribe(
        (response) => {
          this.feed.next(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  likeTweet(tweetId: string | number): void {
    console.log(tweetId)
  }
}
