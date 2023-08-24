import { FieldValue } from '@firebase/firestore-types';

export default interface IClip {
	uid: string;
	displayName: string;
	title: string;
	fileName: string;
	path: string;
	url: string;
	timeStamp: FieldValue;
}