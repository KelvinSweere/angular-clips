import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import {  v4 as uuid } from 'uuid';
import { async, last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from '../services/clip.service';
import IClip from '../models/clip.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnDestroy {
	isDragOver = false;
	file: File | null = null;
	nextStep = false;
	showAlert = false;
	alertColor = 'blue';
	alertMessage = 'Please wait! Your video is being uploaded';
	inSubmission = false;
	percentage = 0;
	showPercentage = false;
	user: firebase.User | null = null;
	task?: AngularFireUploadTask;

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
		private storage: AngularFireStorage,
		private auth: AngularFireAuth,
		private clipService: ClipService,
		private router: Router
	) {
		this.auth.user.subscribe(user => {
			this.user = user;
		});
	 }

	ngOnDestroy(): void {
		this.task?.cancel();
	}

	handleDragOver(event: DragEvent) {
		event.preventDefault();
		this.isDragOver = true;
}

	storeFile($event: Event) {
		$event.preventDefault();
		this.isDragOver = false;

		this.file = (($event as DragEvent).dataTransfer) 
			? ($event as DragEvent).dataTransfer?.files[0] ?? null
			: ($event.target as HTMLInputElement).files?.item(0) ?? null;

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

		this.task = this.storage.upload(clipPath, this.file);

		this.task.percentageChanges().subscribe(progress => {
			this.percentage = progress as number / 100;
		});
		const clipRef = this.storage.ref(clipPath);

		this.task.snapshotChanges().pipe(
			last(),
			switchMap(() => clipRef.getDownloadURL())
		).subscribe({
			next: async (url) => {
				const clip: IClip = {
					uid: this.user?.uid as string,
					displayName: this.user?.displayName as string,
					title: this.title.value,
					fileName: `${clipFileName}.mp4`,
					path: clipPath,
					url
				};

				const clipDocRef = await this.clipService.createClip(clip);

				setTimeout(() => {
					this.router.navigate(['/clip', clipDocRef.id]);
				}, 1000);
				
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
