import { Component, OnInit } from '@angular/core';
import { FontNameUrl } from './FontNameUrl';
import { MongofontService } from './mongofont.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'bettergooglefonts';
}

