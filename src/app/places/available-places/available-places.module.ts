import { NgModule } from '@angular/core';
import { AvailablePlacesComponent } from './available-places.component';
import { CommonModule } from '@angular/common';

import { PlacesContainerModule } from '../places-container/places-container.module';
import { PlacesModule } from '../places.module';

@NgModule({
  declarations: [AvailablePlacesComponent],
  exports: [AvailablePlacesComponent],
  imports: [CommonModule, PlacesContainerModule, PlacesModule],
})
export class AvailablePlacesModule {}
