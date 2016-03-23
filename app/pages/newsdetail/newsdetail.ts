import {Page, NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the NewsdetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/newsdetail/newsdetail.html',
})
export class NewsdetailPage {

  public nav: NavController;
  public item: Object;

  constructor(navParams: NavParams) {
    this.item = navParams.get('item');
    console.log(this.item);
  }
}
