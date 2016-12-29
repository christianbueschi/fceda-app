import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {Tableservice} from '../../providers/table/table';

/*
  Generated class for the GamesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'table.html',
  providers: [Tableservice]
})
export class TablePage {

  public table: Tableservice;
  public dataLoaded: Boolean;

  constructor(table: Tableservice) {
    table.retrieveData(() => {
      this.dataLoaded = true;
    });
    this.table = table;
  }
}
