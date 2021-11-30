import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IComment, IProfile, ITweet } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private profileService: ProfileService) {}

  onShowInput(): void {
    this.showInput = !this.showInput;
  }

  onSubmit(form: NgForm): void {
    if (!form.pristine) {
      const comment = {
        id: uuidv4(),
        user: this.user.id,
        postId: this.tweet.id,
        userName: this.user.name,
        userPicture: this.user.picture,
        content: form.controls.userInput.value,
        date: new Date(),
        likes: 0
      }
      this.profileService.addComment("tweetComments", comment);
      form.controls.userInput.reset();
    } else {
      alert('Please add a comment');
    }
  }

  onCommentDelete(commentId: string | number): void {
    alert("Delete comment?");
    this.profileService.deleteComment("tweetComments", commentId);
  }

  ngOnInit(): void {}
}
