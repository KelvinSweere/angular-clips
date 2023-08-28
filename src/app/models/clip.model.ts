import { FieldValue } from '@firebase/firestore-types';

export default interface IClip {
	docID?: string;
	uid: string;
	displayName: string;
	title: string;
	fileName: string;
	path: string;
	url: string;
	timeStamp: FieldValue;
}