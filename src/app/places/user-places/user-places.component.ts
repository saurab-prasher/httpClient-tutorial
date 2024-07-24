import { Component, OnChanges, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
})
export class UserPlacesComponent implements OnInit {
  places: Place[] = [];
  isFetching = false;
  error = '';

  private subscription: Subscription = new Subscription();
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.isFetching = true;
    this.subscription.add(
      this.placesService.loadedUserPlaces.subscribe({
        next: (places) => {
          this.places = places;
        },
        error: (error: Error) => {
          this.error = error.message;
        },
      })
    );

    this.subscription.add(
      this.placesService.loadUserPlaces().subscribe({
        error: (error: Error) => {
          this.error = error.message;
          this.isFetching = false;
        },
        complete: () => (this.isFetching = false),
      })
    );

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  deletePlace(place: Place) {
    this.placesService.removeUserPlace(place).subscribe({
      next: (resData) => {
        console.log(resData);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
