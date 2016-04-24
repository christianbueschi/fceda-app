import {Page, NavController} from 'ionic-angular';
import {NewsPage} from '../news/news';
import {NewsdetailPage} from '../newsdetail/newsdetail';
import {TablePage} from '../table/table';
import {GamesPage} from '../games/games';
import {TeamPage} from '../team/team';
import {LivetickerPage} from '../liveticker/liveticker';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = NewsPage;
  tab2Root: any = TablePage;
  tab3Root: any = GamesPage;
  tab4Root: any = TeamPage;
  tab5Root: any = LivetickerPage;

  public nav: NavController;

  constructor(nav: NavController) {
    this.initOneSignal();
    this.nav = nav;
  }


  initOneSignal() {
    
    document.addEventListener('deviceready', () => {
   
      window.plugins.OneSignal.init(
        "0e694cca-15b1-42b5-817e-151c9f3a3d70",
        {googleProjectNumber: "703322744261"},
        this.onNotificationOpened.bind(this)
      );
  
      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }, false);
    
  }

  onNotificationOpened() {
    //this.nav.push(LivetickerPage);
  }


}
