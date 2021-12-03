import { Component, OnDestroy, OnInit } from '@angular/core';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { TweetsService } from 'src/app/services/tweets.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit, OnDestroy {
  feed: ITweet[];
  user: IProfile;
  tweetComments: IComment[];

  feedSub: Subscription;
  profileSub: Subscription;
  tweetCommentsSub: Subscription;

  constructor(
    private tweetService: TweetsService,
    private profileService: ProfileService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.tweetService.fetchFeed();
    this.feedSub = this.tweetService.feed.subscribe((res) => {
      this.feed = res;
    });

    this.profileService.fetchUser();
    this.profileSub = this.profileService.profile.subscribe((res) => {
      this.user = res;
    });

    this.commentsService.getComments("tweetComments");
    this.tweetCommentsSub = this.commentsService.tweetComments.subscribe(
      (tweetComments) => (this.tweetComments = tweetComments)
    );
  }

  ngOnDestroy(): void {
    this.feedSub.unsubscribe();
    this.profileSub.unsubscribe();
    this.tweetCommentsSub.unsubscribe();
  }
}
