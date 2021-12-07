import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.scss']
})
export class AddTweetComponent implements OnInit {
  profile: IProfile;

  profileSub: Subscription;

  constructor(private profileService: ProfileService, private tweetsService: TweetsService) { }

  ngOnInit(): void {
    this.profileService.fetchUser();
    this.profileSub = this.profileService.profile.subscribe((response) => {
      this.profile = response;
    })
  }

  onSubmit(form: NgForm): void {
    if (!form.pristine) {
      const tweet: ITweet = {
        id: Math.floor(Math.random() * 10000),
        user: this.profile.id,
        userName: this.profile.name,
        userPicture: this.profile.picture,
        date: new Date(),
        content: form.controls.tweetInput.value,
        likes: [],
        retweet: {
          value: false,
          userRetweet: [],
          retweetCount: 0
        },
        commentsCount: 0,
        saved: []
      }


      this.tweetsService.tweet(tweet)
    };
  }

}
