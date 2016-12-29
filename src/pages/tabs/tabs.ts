import { Component } from '@angular/core';

import {NewsPage} from '../news/news';
import {TablePage} from '../table/table';
import {GamesPage} from '../games/games';
import {TeamPage} from '../team/team';
import {LivetickerPage} from '../liveticker/liveticker';
import { OneSignal } from 'ionic-native';
import {Platform, NavController} from 'ionic-angular'; 

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = NewsPage;
  tab2Root: any = TablePage;
  tab3Root: any = GamesPage;
  tab4Root: any = TeamPage;
  tab5Root: any = LivetickerPage;

  private platform: Platform;
  private navCtrl: NavController

  constructor(platform: Platform) {
    this.platform = platform;
    this.initOneSignal();
  }

  initOneSignal() {

    this.platform.ready().then(()=> {
      if(this.platform.is('cordova')) {
        OneSignal.startInit('0e694cca-15b1-42b5-817e-151c9f3a3d70', '471832424204');

        OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
  
        OneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });
  
        OneSignal.handleNotificationOpened().subscribe(() => {
          this.navCtrl.parent.select(4);
        });
  
        OneSignal.endInit();
        
      }

    })
  }

  onNotificationOpened() {
    //this.nav.push(LivetickerPage);
  }

}
