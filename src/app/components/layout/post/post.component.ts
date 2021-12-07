import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NgForm } from '@angular/forms';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('tweet') tweet: ITweet;
  @Input('user') user: IProfile;
  @Input('tweetComments') tweetComments: IComment[];
  showInput: boolean = false;

  constructor(
    private tweetService: TweetsService,
    private commentsService: CommentsService
  ) {}

  onShowInput(): void {
    this.showInput = !this.showInput;
  }

  onSubmit(form: NgForm): void {
    if (!form.pristine) {
      const comment = {
        id: uuidv4(),
        user: this.user.id,
        postId: this.tweet.id,
        userName: this.user.name,
        userPicture: this.user.picture,
        content: form.controls.userInput.value,
        date: new Date(),
        likes: [],
      };
      this.commentsService.addComment('tweetComments', this.tweet, comment);
      form.controls.userInput.reset();
    } else {
      alert('Please add a comment');
    }
  }

  onCommentDelete(tweet: ITweet, commentId: string | number): void {
    alert('Delete comment?');
    this.commentsService.deleteComment('tweetComments', tweet, commentId);
  }

  onCommentLike(
    userId: number | string,
    type: 'tweetComments' | 'replyComments',
    comment: IComment
  ): void {
    alert('Comment liked');
    this.commentsService.likeComment(userId, type, comment);
  }

  onDeleteTweet(tweetId: string | number): void {
    alert("Tweet deleted");
    this.tweetService.deleteTweet(tweetId);
  }

  onLikeTweet(userId: number | string, tweet: ITweet): void {
    alert("Tweet liked");
    this.tweetService.likeTweet(userId, tweet);
  }

  onSaveTweet(userId: string | number, tweet: ITweet): void {
    alert("Tweet saved");
    this.tweetService.saveTweet(userId, tweet);
  }

  onRetweet(userId: number | string, tweet: ITweet): void {
    alert("Retweeted");
    this.tweetService.retweet(userId, tweet);
  }

  ngOnInit(): void {}
}
