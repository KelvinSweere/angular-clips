import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ClipComponent {
	id = '';
	@ViewChild('videoPlayer', { static: true }) target?: ElementRef;
	player?: Player;

	constructor(private route: ActivatedRoute) { 

	}

	ngOnInit(): void {
		this.player = videojs(this.target?.nativeElement);
		this.route.params.subscribe((params) => {
			this.id = params['id'];
		});
	}

}
