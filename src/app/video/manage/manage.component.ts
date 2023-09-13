import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
	videoOrder = '1';
	clips: IClip[] = [];
	activeClip: IClip | null = null;
	sort$ = new BehaviorSubject<string>('1');

	constructor(
		private router: Router, 
		private route: ActivatedRoute,
		private clipService: ClipService,
		private modal: ModalService
	) {
		this.sort$ = new BehaviorSubject(this.videoOrder);
	}

	ngOnInit() : void {
		this.route.queryParams.subscribe((params: Params) => {
			this.videoOrder = params['sort'] == '2' ? params['sort'] : '1';
			this.sort$.next(this.videoOrder);
		});
		this.clipService.getUserClips(this.sort$).subscribe(docs => {
			this.clips = [];
			docs.forEach(doc => {
				this.clips.push({
					docID: doc.id,
					...doc.data(),
				})
			});
			console.log("this.clips", this.clips);
		});
	}

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigateByUrl(`/manage?sort=${value}`);
	}

	openModal($event: Event, clip: IClip) {
		$event.preventDefault();
		this.activeClip = clip;

		this.modal.toggleModal('editClip');
	}

	update($event: IClip) {
		this.clips.forEach((clip, index) => {
			if (clip.docID === $event.docID) {
				this.clips[index].title = $event.title;
			}
		});
	}

	deleteClip = async ($event: Event, clip: IClip) => {
		$event.preventDefault();
		
		await this.clipService.deleteClip(clip);

		this.clips = this.clips.filter((c) => c.docID !== clip.docID);
	}

	copyToClipboard = async ($event: MouseEvent, docID: string | undefined) => {
		$event.preventDefault();
		
		if(!docID) 
			return console.error('No docID');

		const url = `${location.origin}/clip/${docID}`;
		await navigator.clipboard.writeText(url);

		alert('Copied to clipboard');
	}
}
