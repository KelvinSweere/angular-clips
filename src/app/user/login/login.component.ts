import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

	showAlert = false;
	alertMsg = 'Please wait! We are logging you in.';
	alertColor = 'blue';
	inSubmission = false;

	constructor(private auth: AngularFireAuth) {
	}

	async login() {
		this.showAlert = true;
		this.alertMsg = 'Please wait! We are logging you in.';
		this.alertColor = 'blue';
		this.inSubmission = true;

		try {
			this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);
		}
		catch(err) {
			this.inSubmission = false;
			this.alertMsg = 'Error! Please try again.';
			this.alertColor = 'red';

			console.log("Can't sign-in with email and password: ", err);
			
			return;
		}

		this.alertMsg = 'Success! You are logged in.';
		this.alertColor = 'green';
	}
}
