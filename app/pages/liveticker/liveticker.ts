import {Page, NavController} from 'ionic-angular';
import {Livetickerservice} from '../../providers/liveticker/liveticker';
import {Subscription} from 'rxjs';

/*
  Generated class for the LivetickerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/liveticker/liveticker.html',
  providers: [Livetickerservice]
})
export class LivetickerPage {
  
  private liveticker: Livetickerservice;
  private notificationSubscription: Subscription;
  public notifications: any[] = [];
  public dataLoaded: Boolean;

  constructor(liveticker: Livetickerservice) {
    
     liveticker.retrieveData((hasData) => {
       this.dataLoaded = true;
		  });
      
      this.liveticker = liveticker;
      this.notificationSubscription = this.liveticker.notifications$.subscribe((notifications) => this.notifications = notifications)
  }
}
