import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscription, throwError } from 'rxjs';

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
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.isFetching = true;
    this.subscription = this.httpClient
      .get<{
        places: Place[];
      }>('http://localhost:3000/places', {
        // observe:'events',
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) =>
          throwError(() => new Error('Something went wrong'))
        )
      )

      .subscribe({
        next: (places) => {
          console.log(places);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
