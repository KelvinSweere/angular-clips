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
		this.id = this.route.snapshot.paramMap.get('id') ?? '';

		console.log("clip id: " + this.id);
	}

}
