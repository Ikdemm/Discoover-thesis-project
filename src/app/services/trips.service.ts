import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getTripById(id:string){
    return this.http.get(`/api/trips/${id}`);
  }

  getReservationByTripIdAndUserId(tripId:string, userId:string){
    return this.http.get(`/api/trips/${tripId}/users/${userId}/reservations`);
  }

  confirmTripReservation(reservation){
    console.log(reservation);

    return this.http.put(`/api/trips/${reservation.trip_id}/reservations/${reservation.reservation_id}/confirm`,{travelerId: reservation.traveler_id})
  }
}
