import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	credentials = {
		email: '',
		password: ''
	}

	constructor() {
	}

	login() {
		console.log(this.credentials);
	}

}
