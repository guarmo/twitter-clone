import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 @Input('tweet') tweet: ITweet;

  constructor() { }

  ngOnInit(): void {
  }

}
