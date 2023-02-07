import { Injectable } from '@angular/core';

// interface IModal {
// 	id: string;
// 	visible: boolean;
// }

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	// private modals : IModal[] = [];
	private visible = false;
	
	constructor() {
		console.log('constructor');
		
	}

	// register(id: string) {
	// 	this.modals.push({
	// 		id,
	// 		visible: false
	// 	});
	// 	console.log(this.modals);
		
	// }

  isModalOpen() {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible;		
  }

}
