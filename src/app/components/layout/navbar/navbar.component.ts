import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  name: string;
  profilePicture: string

  profileSub: Subscription;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.fetchUser();
    this.profileSub = this.profileService.profile.subscribe((results) => {
      this.name = results.name;
      this.profilePicture = results.picture
    });
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }

}
