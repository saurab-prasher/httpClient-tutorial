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
  @Output() deletePlace = new EventEmitter<Place>();

  // selectPlace = output<Place>();

  onDeletePlace(place: Place) {
    this.deletePlace.emit(place);
  }

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
