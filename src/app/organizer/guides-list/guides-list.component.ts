import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/User';

@Component({
  selector: 'app-guides-list',
  templateUrl: './guides-list.component.html',
  styleUrls: ['./guides-list.component.css'],
})
export class GuidesListComponent implements OnInit {
  guidesList: User[];
  p: number = 1;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getGuidesByLocation();
  }
  getGuidesByLocation() {
    this.activatedRoute.params.subscribe((params) => {
      let location = params['location'];
      console.log('location', location);
      this.http
        .get('/api/users/guides/location/' + location)
        .subscribe((res: User[]) => {
          console.log('on init guide infos', res);
          this.guidesList = res;
          console.log('this is the guidesList ===>', this.guidesList);
        });
    });
  }
}
