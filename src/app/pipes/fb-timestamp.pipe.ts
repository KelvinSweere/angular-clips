import { Pipe, PipeTransform } from '@angular/core';
import { FieldValue, Timestamp } from '@firebase/firestore-types';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbTimestamp'
})
export class FbTimestampPipe implements PipeTransform {

	constructor(private datePipe: DatePipe) {
	}

  transform(value: FieldValue | undefined): unknown {
		if(!value) {
			return '';
		}
		const date = (value as Timestamp).toDate();
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

}
