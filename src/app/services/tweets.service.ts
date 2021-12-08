import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ITweet } from '../interfaces/interfaces';
import { map, tap } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  feed = new Subject<ITweet[]>();
  bookmarked = new Subject<ITweet[]>();

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  tweet(tweet: ITweet): void {
    const endpoints = ['feed', 'profileFeed'];

    endpoints.map((endpoint, index) => {
      this.http
        .post<ITweet>(`http://localhost:3000/${endpoint}`, tweet)
        .subscribe(
          () => {
            index === 0
              ? this.fetchFeed()
              : this.profileService.fetchProfileFeed();
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  deleteTweet(tweetId: string | number): void {
    const endpoints = ['feed', 'profileFeed'];

    endpoints.map((endpoint, index) => {
      this.http
        .delete<ITweet>(`http://localhost:3000/${endpoint}/${tweetId}`)
        .subscribe(
          () => {
            index === 0
              ? this.fetchFeed()
              : this.profileService.fetchProfileFeed();
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  fetchFeed() {
    this.http.get<ITweet[]>('http://localhost:3000/feed').subscribe(
      (response) => {
        this.feed.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchBookmarked() {
    this.http
      .get<ITweet[]>('http://localhost:3000/feed')
      .pipe(
        map((result: any) =>
          result.filter((el: { saved: string | any[] }) => el.saved.length > 0)
        )
      )
      .subscribe(
        (response) => {
          this.bookmarked.next(response);
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

  saveTweet(userId: number | string, tweet: ITweet): void {
    const uri = `http://localhost:3000/feed/${tweet.id}`;

    const body: ITweet = {
      ...tweet,
      saved: !tweet.saved.includes(userId)
        ? [...tweet.saved, userId]
        : tweet.saved,
    };

    this.http.put(uri, body).subscribe(() => {
      this.fetchFeed();
    });
  }

  retweet(userId: number | string, tweet: ITweet): void {
    const uri = `http://localhost:3000/feed/${tweet.id}`;
    const body: ITweet = {
      ...tweet,
      retweet: {
        value: true,
        userRetweet: tweet.retweet.value
          ? [...tweet.retweet.userRetweet, userId]
          : [userId],
        retweetCount: tweet.retweet.retweetCount + 1,
      },
    };
    this.http.put(uri, body).subscribe(() => {
      this.fetchFeed();
    });
  }
}
