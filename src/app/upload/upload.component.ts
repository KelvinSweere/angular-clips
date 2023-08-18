import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
	isDragOver = false;
	file: File | null = null;
	nextStep = false;

	constructor() { }

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

		this.nextStep = true;



	}
}
