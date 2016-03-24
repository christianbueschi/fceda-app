import {Page, NavController} from 'ionic-angular';
import {Teamservice} from '../../providers/team/team';
import {TeamdetailPage} from '../teamdetail/teamdetail';


@Page({
	templateUrl: 'build/pages/team/team.html',
	providers: [Teamservice]
})
export class TeamPage {

	public team: Teamservice;
	public dataLoaded: Boolean;
	public nav: NavController;

	constructor(team: Teamservice, nav: NavController) {
		this.dataLoaded = false;
		team.retrieveData(() => {
			this.dataLoaded = true;
		});
		this.team = team;
		this.nav = nav;
	}

	itemSelected(item: any) {
		this.nav.push(TeamdetailPage, {
	    	item: item
     	});
	}
}
