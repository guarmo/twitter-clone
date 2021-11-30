import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProfile, ITweet, IComment } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile = new Subject<IProfile>();
  feed = new Subject<ITweet[]>();
  tweetComments = new Subject<IComment[]>();
  replyComments = new Subject<IComment[]>();

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

  getComments(type: 'tweetComments' | 'replyComments'): void {
    this.http
      .get<IComment[]>(`http://localhost:3000/${type}`)
      .subscribe((comments) => {
        if (type === 'tweetComments') {
          this.tweetComments.next(comments);
        }
        if (type === 'replyComments') {
          this.replyComments.next(comments);
        }
        return;
      });
  }

  commentTweet(tweetId: number): Observable<ITweet> {
    return this.http.post<ITweet>(
      `http://localhost:3000/tweetComments/${tweetId}`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        body: {
          user: 1,
          postId: 2,
          userName: 'Daniel Jensen',
          userPicture:
            'https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg',
          content: 'Comment posted',
          date: '26 August at 11:22',
          likes: 0,
        },
      }
    );
  }
}
