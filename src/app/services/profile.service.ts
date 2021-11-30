import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
      // .pipe(tap((response) => console.log(response)))
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

  getComments(type: 'tweetComments' | 'replyComments'): void {
    this.http
      .get<IComment[]>(`http://localhost:3000/${type}`)
      .pipe(tap((response) => console.log(response)))
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

  addComment(
    tweetId: number,
    type: 'tweetComments' | 'replyComments',
    comment: IComment
  ): void {
    this.http
      .post<ITweet>(`http://localhost:3000/${type}/${tweetId}`, {
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
      .subscribe(() => {
        this.tweetComments.next();
      });
  }
}
