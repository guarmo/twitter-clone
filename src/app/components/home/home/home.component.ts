import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITweet } from 'src/app/interfaces/interfaces';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  feed: ITweet[];

  feedSub: Subscription;

  constructor(private tweetsService: TweetsService) { }

  ngOnInit(): void {
    // this.tweetsService.fetchFeed()
    // this.feedSub = this.tweetsService.feed.subscribe((results) => {
    //   this.feed = results;
    // })
  }

  ngOnDestroy(): void {
    // this.feedSub.unsubscribe();
  }

}
