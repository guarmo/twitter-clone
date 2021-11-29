import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProfile, ITweet } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input('tweet') tweet: ITweet;
  @Input('user') user: IProfile;
  showInput: boolean = false;

  constructor() {}

  onShowInput(): void {
    this.showInput = !this.showInput;
  }

  onSubmit(form: NgForm): void {
    if (form.controls.userInput.dirty) {
      console.log(form.controls.userInput.value);
    } else {
      alert('No comment added!');
    }
  }

  ngOnInit(): void {}
}
