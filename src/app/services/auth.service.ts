import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private usersCollection: AngularFirestoreCollection<IUser>;	
	public isAuthenticated$ : Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { 
		this.usersCollection = this.db.collection<IUser>('users');
		this.isAuthenticated$ = this.auth.authState.pipe(
			map(user => !!user)
		); 
	}

	public async createUser(userData: IUser) {
		if(!userData.password) {
			throw new Error('Password is required');
		}

		const userCred = await this.auth.createUserWithEmailAndPassword(
			userData.email as string, 
			userData.password as string
		);

		if(!userCred.user?.uid) {
			throw new Error("User cannot be found.");
		}

		this.usersCollection.doc(userCred.user.uid).set({
			name: userData.name,
			email: userData.email,
			age: userData.age,
			phoneNumber: userData.phoneNumber
		});

		await userCred.user.updateProfile({
			displayName: userData.name 

		})
	}
}
