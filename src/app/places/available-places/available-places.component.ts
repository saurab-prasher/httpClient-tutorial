import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { Subscription } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit, OnDestroy {
  // places = signal<Place[] | undefined>(undefined);
  places: Place[] = [];

  isFetching = false;
  error = '';

  // private destroyRef = inject(DestroyRef);
  private subscription!: Subscription;
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.isFetching = true;
    this.subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (error: Error) => {
        this.error = error.message;
        this.isFetching = false;
      },
      complete: () => (this.isFetching = false),
    });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(selectedPlace: Place) {
    this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
