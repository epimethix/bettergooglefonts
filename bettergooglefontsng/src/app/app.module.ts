import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontpreviewComponent } from './fontpreview/fontpreview.component';
import { FontfiltersComponent } from './fontfilters/fontfilters.component';
import { FontfilterComponent } from './fontfilters/fontfilter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ClassifierComponent } from './classifier/classifier.component';
import { FontoverviewComponent } from './fontoverview/fontoverview.component';

@NgModule({
  declarations: [
    AppComponent,
    FontpreviewComponent,
    FontfiltersComponent,
    FontfilterComponent,
    ClassifierComponent,
    FontoverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
