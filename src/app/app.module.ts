import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HeaderComponent } from './components/profile/header/header.component';
import { SidebarComponent } from './components/profile/sidebar/sidebar.component';
import { ProfileFeedComponent } from './components/profile/profile-feed/profile-feed.component';
import { PostComponent } from './components/profile/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileFeedComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
