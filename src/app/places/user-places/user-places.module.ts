import { NgModule } from '@angular/core';
import { UserPlacesComponent } from './user-places.component';
import { CommonModule } from '@angular/common';
import { PlacesContainerModule } from '../places-container/places-container.module';
import { PlacesModule } from '../places.module';

@NgModule({
  declarations: [UserPlacesComponent],
  imports: [CommonModule, PlacesContainerModule, PlacesModule],
  exports: [UserPlacesComponent],
})
export class UserPlacesModule {}
