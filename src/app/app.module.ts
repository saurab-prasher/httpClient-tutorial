import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AvailablePlacesModule } from './places/available-places/available-places.module';
import { UserPlacesModule } from './places/user-places/user-places.module';
import { PlacesContainerModule } from './places/places-container/places-container.module';
import { PlacesModule } from './places/places.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AvailablePlacesModule,
    UserPlacesModule,
    PlacesContainerModule,
    PlacesModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
