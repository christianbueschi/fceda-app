import {Pipe} from 'angular2/core';

@Pipe({
	name: 'dateFormat'
})
export class DateFormat {

	private customDate: String;

	transform(date) {
		date = new Date(date);
		this.customDate = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
		return this.customDate;
  	}
}