import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Guide from 'src/app/models/Guide';
import { GuideService } from '../services/guides.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

// import { User } from './../models/User';

@Component({
  selector: 'app-guide-profile',
  templateUrl: './guide-profile.component.html',
  styleUrls: ['./guide-profile.component.css'],
})
export class GuideProfileComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private guideService: GuideService,
    private usersService: UsersService
  ) {}

  guide: Guide;
  proposals = [];
  trips = [];
  currentUser = this.tokenStorage.getUser();
  userRole = this.currentUser.roles[1];
  condition = this.currentUser.roles[1] !== 'guide';
  guideId: string;
  currentProposal = [];
  dataIsReady: boolean = false;
  reservationStatus: any;
  avatarFile: File = null;

  ngOnInit(): void {
    this.showReservationConfirmButton();
    this.dataIsReady = false;
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.guideId = param['id'];
      } else {
        this.guideId = param['guideId'];
      }

      console.log('guideId: ', this.guideId);

      /* ****************Get current proposal with guideId and tripId********************** */
      if (param['tripId']) {
        let tripIdFromLink = param['tripId'];
        this.http
          .get(`/api/proposals/current/${this.guideId}/${tripIdFromLink}`)
          .subscribe((res: any) => {
            this.currentProposal = res;
            console.log('============>', this.currentProposal);
          });
      }
    });
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.guideId = param['id'];
      } else {
        this.guideId = param['guideId'];
      }

      this.http
        .get(`/api/users/guides/${this.guideId}`)
        .subscribe((res: any) => {
          console.log('on init guide infos', res);
          this.guide = res;
          this.dataIsReady = true;
          // this.guide.gender = 'Male';
          console.log(this.guide);
          // this.guide.qualifications = res.qualifications;
          console.log('user qualification ==>', this.guide.qualifications);
        });
      /*************Get all the proposal by guide ID******************* */
      this.http
        .get(`/api/proposals/guides/${this.guideId}`)
        .subscribe((res: any) => {
          this.proposals = res;
          console.log('on init guide proposals', this.proposals);
          console.log('on init guide current prop', this.currentProposal);
          this.proposals.forEach((proposal) => {
            let tripId = proposal.tripId;
            let currentProposalStatus =
              // let proposalId = proposal._id;
              this.http.get(`/api/trips/${tripId}`).subscribe((res) => {
                console.log('tripiya wa7da ', res);
                this.trips.push({ res, proposal });
              });
          });
          console.log('this.trips ======>', this.trips);
        });
    });
  }

  onFileSelected(event) {
    this.avatarFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event) => {
      this.guide.avatar = event.target.result as string;
    };

    reader.readAsDataURL(this.avatarFile);

     this.usersService
       .setUserAvatar(this.guide.id, this.avatarFile)
       .subscribe((result) => {
         console.log(result);
       });
   }

  showReservationConfirmButton() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.reservationStatus = { ...params };
      console.log(this.reservationStatus);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hire(result);
      }
    });
  }
  /*********************to refresh page *********************** */
  getGuide() {
    this.dataIsReady = false;
    this.guideService.getGuide(this.guideId).subscribe((guide) => {
      this.guide = guide;
      this.dataIsReady = true;
      console.log('New guide ==>', this.guide);
    });
  }

  // genderHandler(event: any) {
  //   this.guide.gender = event.target.value;
  //   console.log(this.guide.gender);
  // }

  // changeLanguageHandler(event: any) {
  //   this.language = event.target.value;
  //   console.log('the language ===>', this.language);
  // }

  // changeLevelHandler(event: any) {
  //   this.selectedLevel = event.target.value;
  //   console.log('the lenguage level ===>', this.selectedLevel);
  // }

  hire(data) {
    this.activatedRoute.params.subscribe((params) => {
      let tripId = params['tripId'];
      let guideId = params['guideId'];
      let proposal = {
        organizerId: this.currentUser.id,
        guideId: guideId,
        tripId: tripId,
        accepted: null,
        message: data.message,
        pay: data.pay * 1,
      };
      console.log('====================================');
      console.log('Proposal to be added === ', proposal);
      console.log('====================================');
      // console.log('trip id ====>', tripId);
      // console.log('guide id ====>', `/api/trips/${tripId}/edit`);

      ////////// submitting a proposal
      this.http
        .post('/api/proposals/add', proposal)

        .subscribe((result) => {
          console.log('return of adding new proposal (hiring)===>', result);
          this.currentProposal.push(result);
        });
    });

    // this.router.navigate([`/organizer/${this.currentUser.id}/profile`]);
  }

  unhire() {
    console.log('current prop when press unhire ===>', this.currentProposal);
    this.http

      .delete(`/api/proposals/delete/one/${this.currentProposal[0]._id}`)
      .subscribe((res) => {
        console.log(res);
        console.log(
          'this.currentProposal before update ====>',
          this.currentProposal
        );
        this.currentProposal = [];
        console.log(
          'this.currentProposal after update ====>',
          this.currentProposal
        );
      });
    let guideId = this.currentProposal[0].guideId;
    let tripIdToRm = this.currentProposal[0].tripId;
    this.http
      .put(`/api/trips/rmGuide/${tripIdToRm}`, { guideId })
      .subscribe((response) => {
        console.log(response);
      });
  }
  /************We are here for the button of the accept and decline************************ */
  accept(tripId, proposalId) {
    this.http
      .put(`/api/trips/edit/${tripId}`, {
        guide: this.currentUser.id,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.http
      .put(`/api/proposals/guides/acceptance/${proposalId}`, {
        accepted: true,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  decline(tripId, proposalId, guideId) {
    this.http
      .put(`/api/proposals/guides/acceptance/${proposalId}`, {
        accepted: false,
      })
      .subscribe((response) => {
        console.log(response);
      });
    this.http
      .put(`/api/trips/rmGuide/${tripId}`, { guideId })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
