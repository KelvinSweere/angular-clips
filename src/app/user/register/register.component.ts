import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(
		private auth: AuthService, 
		private emailTaken: EmailTaken
	) { }

	inSubmission = false;

	name= new FormControl('', [
		Validators.required,
		Validators.minLength(3)
	])
	email = new FormControl('', [
		Validators.required,
		Validators.email,
		Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')], [
			this.emailTaken.validate
		]
	)
	age = new FormControl<number | null>(null, [
		Validators.required,
		Validators.min(18),
		Validators.max(120)
	])
	password = new FormControl('', [
		Validators.required,
		Validators.min(8),
		// Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
	])
	confirm_password = new FormControl('', [
		Validators.required,
	])
	phoneNumber = new FormControl('', [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(13)
	])

	registerForm = new FormGroup({
		name: this.name,
		email: this.email,
		age: this.age,
		password: this.password,
		confirm_password: this.confirm_password,
		phoneNumber: this.phoneNumber
	}, [RegisterValidators.match("password", "confirm_password")]);

	showAlert = false;
	alertMsg = 'Please wait! Your account is eing created.';
	alertColor = 'blue';

	async register() {
		this.showAlert = true;
		this.alertMsg = 'Please wait! Your account is eing created.';
		this.alertColor = 'blue';
		this.inSubmission = true;

		try {
			await this.auth.createUser(this.registerForm.value as IUser);
		}
		catch(err) {
			console.log(err);
			this.alertMsg = "An unexpceted error occured. Please try again later."
			this.alertColor = 'red';
			this.showAlert = true;
			this.inSubmission = false;
			return;
		}		

		this.alertMsg = 'Your account has been created successfully.';
		this.alertColor = 'green';
		this.showAlert = true;
		this.inSubmission = false;
	}
}
