import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
	videoOrder = '1';
	clips: IClip[] = [];

	constructor(
		private router: Router, 
		private route: ActivatedRoute,
		private clipService: ClipService
	) { }

	ngOnInit() : void {
		this.route.queryParams.subscribe((params: Params) => {
			this.videoOrder = params['sort'] == '2' ? params['sort'] : '1';
		});
		this.clipService.getUserClips().subscribe(docs => {
			this.clips = [];
			docs.forEach(doc => {
				this.clips.push(doc);
			});
		});
	}

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigateByUrl(`/manage?sort=${value}`);
	}

}
