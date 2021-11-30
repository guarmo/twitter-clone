import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ITweet } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  feed = new Subject<ITweet[]>();

  constructor(private http: HttpClient) {}

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

  likeTweet(userId: number | string, tweet: ITweet): void {
    const uri = `http://localhost:3000/feed/${tweet.id}`;
    const body = {
      ...tweet,
      likes: tweet.likes.includes(userId)
        ? tweet.likes
        : [...tweet.likes, userId],
    };

    this.http.put<ITweet[]>(uri, body).subscribe(() => {
      this.fetchFeed();
    });
  }
}
