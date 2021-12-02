import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HeaderComponent } from './components/profile/header/header.component';
import { SidebarComponent } from './components/profile/sidebar/sidebar.component';
import { ProfileFeedComponent } from './components/profile/profile-feed/profile-feed.component';
import { PostComponent } from './components/profile/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home/home.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks/bookmarks.component';
import { ExploreComponent } from './components/explore/explore/explore.component';

const materialModules = [
  MatIconModule
];

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileFeedComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileFeedComponent,
    PostComponent,
    HomeComponent,
    BookmarksComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ...materialModules
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
