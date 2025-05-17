import { Component, ViewEncapsulation } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'europa-pekseg';
}
