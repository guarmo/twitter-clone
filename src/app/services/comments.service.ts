import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IComment, ITweet } from '../interfaces/interfaces';
import { TweetsService } from 'src/app/services/tweets.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  tweetComments = new Subject<IComment[]>();
  replyComments = new Subject<IComment[]>();

  constructor(private http: HttpClient, private tweetService: TweetsService) {}

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

  addComment(type: 'tweetComments' | 'replyComments', tweet: ITweet, comment: IComment): void {
    const uri = `http://localhost:3000/${type}`;
    const body = comment;

    this.http.post<IComment>(uri, body).subscribe(() => {
      this.getComments(type);
    });

    this.updateCommentCount(tweet, "add");
  }

  deleteComment(
    type: 'tweetComments' | 'replyComments',
    tweet: ITweet,
    commentId: number | string
  ): void {
    const uri = `http://localhost:3000/${type}/${commentId}`;

    this.http.delete<IComment>(uri).subscribe(() => {
      this.getComments(type);
    });

    this.updateCommentCount(tweet, "subtract");
  }

  updateCommentCount(post: ITweet, action: 'add' | 'subtract'): void {
    const uri = `http://localhost:3000/feed/${post.id}`;

    const body = {
      ...post,
      commentsCount: action === 'add' ? post.commentsCount + 1 : post.commentsCount - 1,
    };

    this.http.put<ITweet>(uri, body).subscribe(() => {
      this.tweetService.fetchFeed();
    });
  }

  likeComment(
    userId: number | string,
    type: 'tweetComments' | 'replyComments',
    comment: IComment
  ): void {
    const uri = `http://localhost:3000/${type}/${comment.id}`;
    const body = {
      ...comment,
      likes: comment.likes.includes(userId)
        ? comment.likes
        : [...comment.likes, userId],
    };
    this.http.put<IComment>(uri, body).subscribe(() => {
      this.getComments(type);
    });
  }
}
