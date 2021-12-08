import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { IProfile } from 'src/app/interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile: IProfile;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.profile.subscribe((results) => {
      this.profile = results;
    });
}
}
