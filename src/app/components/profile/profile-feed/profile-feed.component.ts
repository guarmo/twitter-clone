import { Component, OnDestroy, OnInit } from '@angular/core';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentsService } from 'src/app/services/comments.service';
import { TweetsService } from 'src/app/services/tweets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit, OnDestroy {
  feed: ITweet[];
  user: IProfile;
  tweetComments: IComment[];

  feedSub: Subscription;
  userSub: Subscription;
  tweetCommentsSub: Subscription;

  constructor(
    private profileService: ProfileService,
    private commentsService: CommentsService,
    private tweetsService: TweetsService
  ) {}

  ngOnInit(): void {
    this.tweetsService.fetchFeed();
    this.feedSub = this.tweetsService.feed
      .subscribe((results) => {
        this.feed = results;
      });

    this.profileService.fetchUser();
    this.userSub = this.profileService.profile
      .subscribe((profile) => {
        this.user = profile;
      });

    this.commentsService.getComments('tweetComments');
    this.tweetCommentsSub = this.commentsService.tweetComments.subscribe(
      (tweetComments) => (this.tweetComments = tweetComments)
    );
  }

  ngOnDestroy(): void {
    this.feedSub.unsubscribe();
    this.userSub.unsubscribe();
    this.tweetCommentsSub.unsubscribe();
  }
}
