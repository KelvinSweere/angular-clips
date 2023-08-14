import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class ClipComponent {
	id= '';
	
	constructor(private route: ActivatedRoute) { 

	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params['id'];
		});
	}

}
