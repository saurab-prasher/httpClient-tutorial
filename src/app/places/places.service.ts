import { Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  constructor(private httpClient: HttpClient) {}

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId,
      })
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{
        places: Place[];
      }>(url, {
        // observe:'events',
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => throwError(() => new Error(errorMessage)))
      );
  }
}
