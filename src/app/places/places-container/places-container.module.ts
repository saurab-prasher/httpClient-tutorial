import { NgModule } from '@angular/core';
import { PlacesContainerComponent } from './places-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlacesContainerComponent],
  imports: [CommonModule],
  exports: [PlacesContainerComponent],
})
export class PlacesContainerModule {}
