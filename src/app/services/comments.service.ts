import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IComment } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  tweetComments = new Subject<IComment[]>();
  replyComments = new Subject<IComment[]>();

  constructor(private http: HttpClient) { }


  getComments(type: 'tweetComments' | 'replyComments'): void {
    this.http
      .get<IComment[]>(`http://localhost:3000/${type}`)
      // .pipe(tap((response) => console.log(response)))
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

  addComment(type: 'tweetComments' | 'replyComments', comment: IComment): void {
    const uri = `http://localhost:3000/${type}`;
    const body = comment;

    this.http.post<IComment>(uri, body).subscribe(() => {
      this.getComments(type);
    });
  }

  deleteComment(
    type: 'tweetComments' | 'replyComments',
    commentId: number | string
  ): void {
    const uri = `http://localhost:3000/${type}/${commentId}`;

    this.http.delete<IComment>(uri).subscribe(() => {
      this.getComments(type);
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
