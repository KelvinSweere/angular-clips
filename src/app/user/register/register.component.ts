import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private auth: AngularFireAuth) { }

	inSubmission = false;

	name= new FormControl('', [
		Validators.required,
		Validators.minLength(3)
	])
	email = new FormControl('', [
		Validators.required,
		Validators.email,
		Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
	)
	age = new FormControl('', [
		Validators.required,
		Validators.min(18),
		Validators.max(120)
	])
	password = new FormControl('', [
		Validators.required,
		Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
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
	});

	showAlert = false;
	alertMsg = 'Please wait! Your account is eing created.';
	alertColor = 'blue';

	async register() {
		this.showAlert = true;
		this.alertMsg = 'Please wait! Your account is eing created.';
		this.alertColor = 'blue';
		this.inSubmission = true;

		const { email, password } = this.registerForm.value;

		try {
			const userCred = await this.auth.createUserWithEmailAndPassword(
				email as string, 
				password as string
			);
			console.log(userCred);
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
