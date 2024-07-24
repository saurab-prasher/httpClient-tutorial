import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AvailablePlacesModule } from './places/available-places/available-places.module';
import { UserPlacesModule } from './places/user-places/user-places.module';
import { PlacesContainerModule } from './places/places-container/places-container.module';
import { PlacesModule } from './places/places.module';
import { ErrorModalComponent } from '../shared/modal/error-modal/error-modal.component';
import { tap } from 'rxjs';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING'),
  // });
  // console.log('Outgoing request: ');
  // console.log(request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Incoming response: ');
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AvailablePlacesModule,
    UserPlacesModule,
    PlacesContainerModule,
    PlacesModule,
    ErrorModalComponent,
  ],
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
