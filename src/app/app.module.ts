import { NgModule, ErrorHandler } from '@angular/core';
import {HttpModule} from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamesPage } from '../pages/games/games';
import { LivetickerPage } from '../pages/liveticker/liveticker';
import { TeamPage } from '../pages/team/team';
import { TeamdetailPage } from '../pages/teamdetail/teamdetail';
import { NewsPage } from '../pages/news/news';
import { NewsdetailPage } from '../pages/newsdetail/newsdetail';
import { TabsPage } from '../pages/tabs/tabs';
import { TablePage } from '../pages/table/table';

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    TeamPage,
    GamesPage,
    TabsPage,
    TablePage,
    NewsdetailPage,
    LivetickerPage,
    TeamdetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    TeamPage,
    GamesPage,
    TabsPage,
    TablePage,
    NewsdetailPage,
    LivetickerPage,
    TeamdetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
