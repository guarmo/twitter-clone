import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { TweetsService } from 'src/app/services/tweets.service';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  feed: ITweet[];
  user: IProfile;
  tweetComments: IComment[];

  constructor(
    private tweetService: TweetsService,
    private profileService: ProfileService,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    this.tweetService.feed.subscribe((res) => {
      this.feed = res;
    });

    this.profileService.profile.subscribe((res) => {
      this.user = res;
    });

    this.commentsService.tweetComments.subscribe(
      (tweetComments) => (this.tweetComments = tweetComments)
    );

    // this.tweetService.fetchFeed();
    // this.profileService.fetchUser();
  }
}
