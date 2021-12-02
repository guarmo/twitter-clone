import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'twitter-clone';

  constructor(private profileService: ProfileService,) {}

  ngOnInit() {
    this.profileService.fetchUser();
  }
}
