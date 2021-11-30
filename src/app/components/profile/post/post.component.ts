import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('tweet') tweet: ITweet;
  @Input('user') user: IProfile;
  @Input('tweetComments') tweetComments: IComment[];
  showInput: boolean = false;

  constructor() {}

  onShowInput(): void {
    this.showInput = !this.showInput;
  }

  onSubmit(form: NgForm): void {
    if (!form.pristine) {
      console.log(form.controls.userInput.value);
    } else {
      alert('Please add a comment');
    }
  }

  ngOnInit(): void {}
}
