import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the NewsdetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'teamdetail.html',
})
export class TeamdetailPage {

  public nav: NavController;
  public item: Object;

  constructor(navParams: NavParams) {
    this.item = navParams.get('item');
    console.log(this.item);
  }
}
