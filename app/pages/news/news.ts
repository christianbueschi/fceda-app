import {Page, NavController} from 'ionic-angular';
import {Newsservice} from '../../providers/news/news';
import {NewsdetailPage} from '../newsdetail/newsdetail';
import {DateFormat} from '../../pipes/dateformat/dateformat';


@Page({
  	templateUrl: 'build/pages/news/news.html',
	providers: [Newsservice],
	pipes: [DateFormat]
})
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
