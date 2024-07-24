import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
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

  private subscription!: Subscription;
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.isFetching = true;
    this.subscription = this.placesService.loadUserPlaces().subscribe({
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
