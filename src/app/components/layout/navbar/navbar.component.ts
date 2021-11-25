import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/interfaces/interfaces';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string;
  profilePicture: string

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.profile.subscribe((results) => {
      this.name = results.name;
      this.profilePicture = results.picture
    });
  }

}
