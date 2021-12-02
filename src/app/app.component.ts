import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { CommentsService } from 'src/app/services/comments.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'twitter-clone';

  constructor(
    private profileService: ProfileService,
    private commentsService: CommentsService,
    private tweetsService: TweetsService
  ) {}

  ngOnInit() {
    this.profileService.fetchUser();
    this.tweetsService.fetchFeed();
    this.tweetsService.fetchProfileFeed();
    this.commentsService.getComments('tweetComments');
    this.commentsService.getComments('replyComments');
  }
}
