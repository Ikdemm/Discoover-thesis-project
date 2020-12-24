import { Component, OnInit, Input } from '@angular/core';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css']
})
export class TripItemComponent implements OnInit {
@Input()
  trip;
  faMapMarker = faMapMarker;

  constructor() { }

  ngOnInit(): void {

  }

}
