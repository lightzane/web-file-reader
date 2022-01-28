import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { snackbarOptions } from './constants/snackbar-options';
import { ShouldBeShortenedPipe } from './shared/pipes/should-be-shortened.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe,
    ShouldBeShortenedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: snackbarOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
