import { Component, Input, OnInit } from '@angular/core';
import { IProfile, ITweet } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 @Input('tweet') tweet: ITweet;
 @Input('user') user: IProfile;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.user)
  }

}
