import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../../../server/models/Trips.js';
import { User } from '../../../../server/models/User.js';
import { TokenStorageService } from 'src/app/services/token-storage.service.js';

@Component({
  selector: 'app-trip-details-vistor',
  templateUrl: './trip-details-vistor.component.html',
  styleUrls: ['./trip-details-vistor.component.css'],
})
export class TripDetailsVistorComponent implements OnInit {
  tripId: string;
  organizer: User;
  tripDetails: Trip;
  organizerName: String;
  guideInfo: User;
  isLoggedIn = !!this.tokenStorage.getUser();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.tripId = param["id"];
      console.log('tripd IDDDD', this.tripId);

      this.http
        .get(`/api/trips/${this.tripId}`)
        .subscribe((data: Trip[]) => {
          this.tripDetails = data;
          console.log('the data from DB is ====>', this.tripDetails);

          let id = this.tripDetails.organizerId;
          this.http
          .get(`/api/user/organizer/${id}`)
          .subscribe((result: User[]) => {
            this.organizer = result;
            console.log('the result from DB is ===>', result);

          })
          let guideId = this.tripDetails.guide[0];
          this.http
          .get(`/api/user/guide/${guideId}`)
          .subscribe((result : User[]) => {
            this.guideInfo = result;
            console.log('the guide name is ====>', this.guideInfo.first_name);
          })
        });
    });
  }

  showOrganizer() {
    if(this.isLoggedIn){
      this.router.navigate(['/organizer', this.organizer?._id, 'profile']);
    }
    else {
      this.router.navigate(['/signin']);
    }
  }
}
