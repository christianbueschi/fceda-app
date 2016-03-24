import {Page, NavController} from 'ionic-angular';
import {Gamesservice} from '../../providers/games/games';

/*
  Generated class for the GamesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/games/games.html',
  providers: [Gamesservice]
})
export class GamesPage {
  
	public games: Gamesservice;
  public dataLoaded: Boolean;

	constructor(games: Gamesservice) {
		games.retrieveData(() => {
      this.dataLoaded = true;
    });
		this.games = games;
  }
}
