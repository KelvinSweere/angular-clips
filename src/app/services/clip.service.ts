import { Injectable } from '@angular/core';
import { 
    AngularFirestore, 
    AngularFirestoreCollection, 
    DocumentReference
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ClipService {
	public clipsCollection: AngularFirestoreCollection<IClip>;

	constructor(
		private db: AngularFirestore,
		private auth: AngularFireAuth
	) { 
		this.clipsCollection = this.db.collection<IClip>('clips');
	}

	createClip(clip: IClip): Promise<DocumentReference<IClip>> {
		return this.clipsCollection.add(clip);
	}

	getUserClips() {
		return this.auth.user.pipe(
				switchMap((user) => {
				if (!user) {
							return [];
					}
					
					const query = this.clipsCollection.ref.where(
						'uid', '==', user.uid
					);        
					
					return query.get();
				})
		);
	}

	updateClip(id: string, title: string): Promise<void> {
		return this.clipsCollection.doc(id).update({
			title
		});
	}
}
