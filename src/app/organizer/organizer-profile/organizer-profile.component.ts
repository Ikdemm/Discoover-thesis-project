import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './../../services/token-storage.service';
import { Trip } from '../../../../server/models/Trips';
@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css'],
})
export class OrganizerProfileComponent implements OnInit {
  currentUser: any;
  selectedGender = '';
  organizerId:string;
  organizer = {
    first_name: '',
    username: '',
    last_name: '',
    gender: '',
    location: '',
    email: '',
    password: '',
    bio: '',
    phone_number: '',
  };

  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  trips: Trip[];

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.route.params.subscribe(params => {
      this.organizerId = params['id'];
    })
    this.http
      .get(`/api/user/organizer/${this.currentUser.id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.organizer = res;
      });
    this.http
      .get(`/api/user/organizer/trips/${this.currentUser.id}`)
      .subscribe((data: Trip[]) => {
        this.trips = data;
      });
  }

  getTrip(tripId) {
    console.log('click is working');

    this.router.navigate([`/organizer/${this.organizerId}/trip/details/${tripId}`]);
  }

  addTrip() {
    console.log('click is working trip add');
    this.currentUser = this.token.getUser();
    console.log('current user ====>', this.currentUser.id);

    this.router.navigate([`/organizer/${this.organizerId}/trip/add`]);
  }

  genderHandler(event: any) {
    this.organizer.gender = event.target.value;
    console.log(this.organizer.gender);
  }
  onClick() {
    window.location.reload();
    console.log('organizer profile updated with ==>', this.organizer);

    this.http
      .put('/api/user/organizer/edit', this.organizer)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
