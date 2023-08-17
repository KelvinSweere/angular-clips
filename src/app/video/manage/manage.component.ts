import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {
	videoOrder = '1';

	constructor(private router: Router, private route: ActivatedRoute) { }

	ngOnInit() : void {
		this.router.events.subscribe((event: Params) => {
			if (event instanceof PopStateEvent) {
				this.videoOrder = this.route.snapshot.queryParamMap.get('sort') || 'name';
			}
		});
	}

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigateByUrl(`/manage?sort=${value}`);
	}

}
