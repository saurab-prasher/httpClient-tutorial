import { NgModule } from '@angular/core';
import { UserPlacesComponent } from './user-places.component';
import { CommonModule } from '@angular/common';
import { PlacesContainerModule } from '../places-container/places-container.module';

@NgModule({
  declarations: [UserPlacesComponent],
  imports: [CommonModule, PlacesContainerModule],
  exports: [UserPlacesComponent],
})
export class UserPlacesModule {}
