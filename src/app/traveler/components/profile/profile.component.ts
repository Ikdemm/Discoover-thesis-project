import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Traveler from 'src/app/models/Traveler';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileOwner: Traveler = new Traveler();
  currentUser: any = this.tokenStorage.getUser();
  bookedTrips: any[];
  avatarFile: File = null;
  reservationStatus: any;

  constructor(
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.getTravelerData(param['id']);
      }
    });
  }

  showReservationConfirmButton() {
    this.route.queryParamMap.subscribe((params) => {
      this.reservationStatus = { ...params };
      console.log(this.reservationStatus);
    });
  }

  getTravelerData(id) {
    this.usersService.getTraveler(id).subscribe((user) => {
      console.log(user);
      this.profileOwner = new Traveler(user);
      console.log(this.profileOwner.id);
    });
  }

  onFileSelected(event) {
    this.avatarFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event) => {
      this.profileOwner.avatar = event.target.result as string;
    };

    reader.readAsDataURL(this.avatarFile);

     this.usersService
       .setUserAvatar(this.profileOwner.id, this.avatarFile)
       .subscribe((result) => {
         console.log(result);
       });
   }


  // onFileSelected(event) {
  //  this.avatarFile = event.target.files[0];


  //   this.usersService
  //     .setUserAvatar(this.profileOwner.id, this.avatarFile)
  //     .subscribe((result) => {
  //       console.log(result);
  //     });
  // }
}
