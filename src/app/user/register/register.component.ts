import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
		Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
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

	
	constructor() {
	}

	register() {
		this.showAlert = true;
		this.alertMsg = 'Please wait! Your account is eing created.';
		this.alertColor = 'blue';
	}
}
