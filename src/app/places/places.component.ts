import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';

import { Place } from './place.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  @Input({ required: true }) places: Place[] = [];

  @Output() selectPlace = new EventEmitter<Place>();

  // selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
