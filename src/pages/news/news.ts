import { Pipe, Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Newsservice} from '../../providers/news/news';
import {NewsdetailPage} from '../newsdetail/newsdetail';
import {DateFormat} from '../../pipes/dateformat/dateformat';


@Component({
  	templateUrl: 'news.html',
	providers: [Newsservice]
})

@Pipe({name: 'DateFormat'})

export class NewsPage {

	public news: Newsservice;
	public nav: NavController;
	public dataLoaded: Boolean;

	constructor(news: Newsservice, nav: NavController) {
		news.retrieveData(() => {
			this.dataLoaded = true;
		});
		this.news = news;
		this.nav = nav;
	}

	itemSelected(item: any) {
		this.nav.push(NewsdetailPage, {
	    	item: item
     	});
	}

	stringAsDate(dateStr) {
		return new Date(dateStr);
	}
}
