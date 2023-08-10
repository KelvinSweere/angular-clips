import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
	providers: [
	]
})
export class AppComponent {
	constructor(public auth: AuthService) {

	}
}
