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
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit, OnDestroy {
  // places = signal<Place[] | undefined>(undefined);
  places: Place[] = [];

  // private destroyRef = inject(DestroyRef);
  private subscription!: Subscription;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.subscription = this.httpClient
      .get<{
        places: Place[];
      }>('http://localhost:3000/places', {
        // observe:'events',
      })
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places = places;
        },
      });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
