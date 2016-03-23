import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Gamesservice {

  private http: Http;
  private data: Object;

  constructor(http: Http) {
    this.http = http;
    this.data = Object;
  }

  retrieveData() {
    this.http.get('http://www.fceda.ch/app/tabelle.php')
      .subscribe(data => {
        this.data = data;
      });
  }

  getData() {
    return this.data;
  }
}

