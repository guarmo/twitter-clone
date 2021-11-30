import { Component, OnInit } from '@angular/core';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentsService } from 'src/app/services/comments.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  feed: ITweet[];
  user: IProfile;
  tweetComments: IComment[];

  constructor(
    private profileService: ProfileService,
    private commentsService: CommentsService,
    private tweetsService: TweetsService
  ) {}

  ngOnInit(): void {
    this.tweetsService.feed
      // .pipe(tap((results) => {}))
      .subscribe((results) => {
        this.feed = results;
      });

    this.profileService.profile
      // .pipe(
      //   tap((profile) => {
      //     console.log(`Here ${profile.picture}`);
      //   })
      // )
      .subscribe((profile) => {
        this.user = profile;
      });

    // .subscribe((profile) => {
    //   this.user = profile;
    // });

    this.commentsService.tweetComments.subscribe(
      (tweetComments) => (this.tweetComments = tweetComments)
    );
  }
}
