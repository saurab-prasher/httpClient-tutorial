import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _userPlaces = new BehaviorSubject<Place[]>([]);
  loadedUserPlaces = this._userPlaces.asObservable();

  constructor(private httpClient: HttpClient) {}

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
    ).pipe(
      map((userPlaces) => {
        const places = [...userPlaces];
        this._userPlaces.next(places);
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = [...this._userPlaces.value];

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this._userPlaces.next([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', { placeId: place.id })
      .pipe(
        catchError((error) =>
          throwError(() => new Error('Failed to add place to user places'))
        )
      );

    // this._userPlaces
    //   .pipe(
    //     take(1),
    //     mergeMap((userPlaces) => {
    //       if (!userPlaces.some((p) => p.id === placeId)) {
    //         return this.httpClient
    //           .put('http://localhost:3000/user-places', { placeId })
    //           .pipe(
    //             mergeMap(() => this.loadUserPlaces()),
    //             catchError((error) =>
    //               throwError(
    //                 () => new Error('Failed to add place to user places')
    //               )
    //             )
    //           );
    //       } else {
    //         return of(null); // Return an  null  observable  if place is already present
    //       }
    //     })
    //   )
    //   .subscribe();
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
