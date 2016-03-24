import {Page, NavController} from 'ionic-angular';
import {Newsservice} from '../../providers/newsservice/newsservice';
import {NewsdetailPage} from '../newsdetail/newsdetail';


@Page({
  	templateUrl: 'build/pages/news/news.html',
	providers: [Newsservice]
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
}
