import { Component } from '@angular/core';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-clone';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.fetchUser();
    this.profileService.fetchUserFeed();
    this.profileService.getComments("tweetComments");
    this.profileService.getComments("replyComments");
  }
}
