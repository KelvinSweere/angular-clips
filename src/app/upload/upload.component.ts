import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  v4 as uuid } from 'uuid';
import { last } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
	isDragOver = false;
	file: File | null = null;
	nextStep = false;
	showAlert = false;
	alertColor = 'blue';
	alertMessage = 'Please wait! Your video is being uploaded';
	inSubmission = false;
	percentage = 0;
	showPercentage = false;

	title = new FormControl('', {
		validators: [
			Validators.required,
			Validators.minLength(3),
		],
		nonNullable: true
	});
	
	uploadForm = new FormGroup({
		title: this.title
	});

	constructor(
		private storage: AngularFireStorage
	) { }

	ngOnInit(): void {
	}

	handleDragOver(event: DragEvent) {
		event.preventDefault();
		this.isDragOver = true;
}

	storeFile($event: DragEvent) {
		$event.preventDefault();
		this.isDragOver = false;

		this.file = $event.dataTransfer?.files[0] || null;

		if(!this.file || this.file.type !== 'video/mp4') {
			this.file = null;
			alert('Only video files are allowed');
			return;
		}

		this.title.setValue(this.file.name.replace('/\.[^/.]+$/', ''));
		this.nextStep = true;
	}

	uploadFile() {
		this.showAlert = true;
		this.alertColor = 'blue';
		this.alertMessage = 'Please wait! Your video is being uploaded';
		this.inSubmission = true;
		this.showPercentage = true;

		const clipFileName = uuid();
		const clipPath = `clips/${clipFileName}.mp4`;

		const task = this.storage.upload(clipPath, this.file);

		task.percentageChanges().subscribe(progress => {
			this.percentage = progress as number / 100;
		});

		task.snapshotChanges().pipe(
			last()
		).subscribe({
			next: (snapshot) => {
				this.alertColor = 'green';
				this.alertMessage = 'Success! Your clip is nowready to be shared with the world';
				this.showPercentage = false;
				this.inSubmission = false;
			},
			error: (error) => {
				this.alertColor = 'red';
				this.alertMessage = 'Something went wrong! Please try again later';
				this.inSubmission = false;
				this.showPercentage = false;
				console.error(error);
			}
		});
	}
}
