import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
	providers: [
		ModalService
	]
})
export class AppComponent {
  title = 'clips';

	constructor() {
	}

}
