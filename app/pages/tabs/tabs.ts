import {Page} from 'ionic-angular';
import {NewsPage} from '../news/news';
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
}
