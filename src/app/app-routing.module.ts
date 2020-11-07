import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerProfileComponent } from './organizer/organizer-profile/organizer-profile.component';
import { TripDetailsComponent } from './organizer/trip-details/trip-details.component';
import { GuidesListComponent } from './organizer/guides-list/guides-list.component';
import { TripDetailsVistorComponent } from './search-trip/trip-details-vistor/trip-details-vistor.component';

import { GuideATripComponent } from './guide/guide-a-trip/guide-a-trip.component';
import { GuideProfileComponent } from './guide/guide-profile/guide-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrganizeATripComponent } from './organizer/organize-a-trip/organize-a-trip.component';
import { EditTripComponent } from './organizer/edit-trip-component/edit-trip.component';
import { SearchTripComponent } from './search-trip/search-trip.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './traveler/components/profile/profile.component';
import { LandComponent } from './land/land.component';
import { EditProfileComponent } from './organizer/edit-profile/edit-profile.component';
import { ProposalsListComponent } from './organizer/proposals-list/proposals-list.component';
import { TripsListComponent } from './organizer/trips-list/trips-list.component';
import { EditGuideProfileComponent } from './guide/edit-guide-profile/edit-guide-profile.component';
import { GuidePropsalasListComponent } from './guide/guide-propsalas-list/guide-propsalas-list.component';
import { MyBookingsListComponent } from './traveler/components/my-bookings-list/my-bookings-list.component';
import { EditTravelerProfileComponent } from './traveler/components/edit-traveler-profile/edit-traveler-profile.component';


const routes: Routes = [
  { path: '', component: LandComponent },
  { path: 'searchTrip', component: SearchTripComponent },
  { path: 'organizers/:id/profile', component: OrganizerProfileComponent },
  { path: 'organizers/:id/profile/edit', component: OrganizerProfileComponent },
  { path: 'organizers/:id/trips', component: TripsListComponent},
  { path: 'organizers/:id/profile/settings', component: EditProfileComponent},
  { path: 'organizers/:id/proposals', component: ProposalsListComponent},
  { path: 'organizers/:id/trip/add', component: OrganizeATripComponent },
  { path: 'organizers/:id/trips/:tripId/edit', component: EditTripComponent },
  { path: 'organizers/trip/details/:tripId', component: TripDetailsComponent },
  { path: 'guides/:id/profile', component: GuideProfileComponent },
  { path: 'guides/:id/profile/settings', component: EditGuideProfileComponent},
  { path: 'guides/:id/proposals', component: GuidePropsalasListComponent },
  { path: 'users/:id/bookings', component: MyBookingsListComponent},
  {
    path: 'organizer/trip/details/guides/:tripId/:location',
    component: GuidesListComponent,
  },
  { path: 'guide/:guideId/profile/:tripId', component: GuideProfileComponent },
  { path: 'guideTrip', component: GuideATripComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/:role', component: SignupComponent },
  { path: 'signup/traveler', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'trips/:id/details', component: TripDetailsVistorComponent },
  { path: 'travelers/:id/profile', component: ProfileComponent },
  { path: 'travelers/:id/profile/settings', component: EditTravelerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
