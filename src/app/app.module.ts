import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorNavbarComponent } from './visitor-navbar/visitor-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { OrganizeATripComponent } from './organize-a-trip/organize-a-trip.component';
import { GuideATripComponent } from './guide-a-trip/guide-a-trip.component';
import { GuideProfileComponent } from './guide-profile/guide-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { GuideNavBarComponent } from './guide-navbar/guide-navbar.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    VisitorNavbarComponent,
    LandingPageComponent,
    SearchTripComponent,
    OrganizeATripComponent,
    GuideATripComponent,
    GuideNavBarComponent,
    OrganizerProfileComponent,
    GuideProfileComponent,
    SignupComponent,
    SigninComponent,
<<<<<<< HEAD
=======

    OrganizerNavbarComponent,

>>>>>>> 3f1ab8e4dec78cc37d0a4e1f26a3e61962927654
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
