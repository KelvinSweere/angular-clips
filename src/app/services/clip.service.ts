import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import IClip from '../models/clip.model';

import { map, switchMap } from 'rxjs/operators';
import { of, BehaviorSubject, combineLatest, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipService implements Resolve<IClip | null> {
  public clipsCollection: AngularFirestoreCollection<IClip>
  pageClips: IClip[] = [];
  pendingReq = false;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.clipsCollection = db.collection('clips');
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.clipsCollection.doc(route.params['id'])
      .get()
      .pipe(
        map(snapshot => {
          const data = snapshot.data();

          if(!data) {
            this.router.navigate(['/']);
            return null;
          }

          return data;
        })
      );
  } 

  async createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return await this.clipsCollection.add(data);
  }

  async getClips() {
    if(this.pendingReq) {
      return
    }

    this.pendingReq = true;

    let query = this.clipsCollection.ref
      .orderBy('timeStamp', 'desc')
      .limit(6);

    const { length } = this.pageClips;

		if(length !== 0) {
      const lastDocID = this.pageClips[length-1].docID
      const lastDocSource = this.clipsCollection.doc(lastDocID).get();
      const lastDoc = await lastValueFrom(lastDocSource);

      query = query.startAfter(lastDoc)
		}
    
    const snapshot = await query.get();

    snapshot.forEach(doc => {
      this.pageClips.push({
        docID: doc.id,
        ...doc.data()
      })
    });

    this.pendingReq = false;
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([
      this.auth.user,
      sort$
    ]).pipe(
      switchMap((values) => {
        const [user, sort] = values;

        if(!user) {
          return of([])
        }

        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy(
          'timeStamp',
          sort === '1' ? 'desc' : 'asc'
        );

        return query.get();
      }),
      map(
        (snapshot) => (snapshot as QuerySnapshot<IClip>).docs
      )
    );
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({
      title
    });
  }

  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    const screenshotRef = this.storage.ref(`screenshots/${clip.screenshotFileName}`);
    
    await clipRef.delete();
    await screenshotRef.delete();

    await this.clipsCollection.doc(clip.docID).delete();
  }

}