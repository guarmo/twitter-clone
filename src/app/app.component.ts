import { Component } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-clone';

  constructor(private profileService: ProfileService, private commentsService: CommentsService) {}

  ngOnInit() {
    this.profileService.fetchUser();
    this.profileService.fetchUserFeed();
    this.commentsService.getComments("tweetComments");
    this.commentsService.getComments("replyComments");
  }
}
