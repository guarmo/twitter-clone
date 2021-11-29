import { Component, OnInit } from '@angular/core';
import { IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  feed: ITweet[];
  user: IProfile;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.feed.pipe(tap((results) => {})).subscribe((results) => {
      this.feed = results;
    });

    this.profileService.profile
      .pipe(
        tap((profile) => {
          console.log(`Here ${profile.picture}`);
        })
      )
      .subscribe((profile) => {
        this.user = profile;
      });

    // .subscribe((profile) => {
    //   this.user = profile;
    // });
  }
}
