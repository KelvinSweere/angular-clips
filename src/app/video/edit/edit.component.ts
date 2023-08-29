import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy, OnInit, OnChanges {
	@Input() clip: IClip | null = null;
	inSubmission = false;
	showAlert = false;
	alertColor = 'blue';
	alertMsg = 'Please wait! Updating clip.'

	docID = new FormControl('', {
		nonNullable: true
	});

	title = new FormControl('', {
		validators: [
			Validators.required,
			Validators.minLength(3),
		],
		nonNullable: true
	});
	
	editForm = new FormGroup({
		title: this.title,
		docID: this.docID
	});

	constructor(
		private modal: ModalService,
		private clipService: ClipService
	) { }

	ngOnInit(): void {
		this.modal.register('editClip');
	}

	ngOnDestroy(): void {
		this.modal.unregister('editClip');
	}

  ngOnChanges(): void {
    if(!this.clip) {
      return
    }

    this.inSubmission = false;
    this.showAlert = false;
    this.docID.setValue(this.clip.docID!);
    this.title.setValue(this.clip.title);
  }

	async submit() {
		this.inSubmission = true;
		this.showAlert = true;
		this.alertColor = 'blue';
		this.alertMsg = 'Please wait! Updating clip.'

		try {
			await this.clipService.updateClip(
				this.docID.value, 
				this.title.value
			);
		}
		catch(e) {
			console.error(e);
			this.inSubmission = false;
			this.alertColor = 'red';
			this.alertMsg = 'Error! Could not update clip.'
			return;
		}
		
		this.inSubmission = false;
		this.alertColor = 'green';
		this.alertMsg = 'Success!'
	}
}
