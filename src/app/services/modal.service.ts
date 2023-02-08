import { Injectable } from '@angular/core';

interface IModal {
	id: string;
	visible: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private modals : IModal[] = [];
	
	constructor() {	
	}

	register(id: string) {

		this.modals.push({
			id,
			visible: false
		});
		console.log(this.modals);
	}

	unregister(id: string) {
		this.modals = this.modals.filter(
			element => element.id !== id
		)
	}

  isModalOpen(id: string) : boolean {
    return !!this.modals.find(element => element.id === id)?.visible;
  }

  toggleModal(id: string) : void {
		const modal = this.modals.find(element => element.id === id) as IModal;
		console.log('toggle for modal : ', modal);
		
		if(modal) {
			modal.visible = !modal.visible;
		}
  }
}
