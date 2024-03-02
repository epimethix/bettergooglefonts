import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontpreviewComponent } from './fontpreview/fontpreview.component';
import { FontfiltersComponent } from './fontfilters/fontfilters.component';
import { AxisFontfilterComponent } from './fontfilters/fontfilter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ClassifierComponent } from './classifier/classifier.component';
import { FontoverviewComponent } from './fontoverview/fontoverview.component';
import { MatFormField } from '@angular/material/form-field';
import { ClassifierJsonComponent } from './classifier-json/classifier-json.component';

@NgModule({
  declarations: [
    AppComponent,
    FontpreviewComponent,
    FontfiltersComponent,
    AxisFontfilterComponent,
    ClassifierComponent,
    FontoverviewComponent,
    ClassifierJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
