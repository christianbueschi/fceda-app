import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Teamservice {

  private http: Http;
  private data: String;

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  retrieveData(callback: Function) {
    this.http.get('http://www.fceda.ch/wp-json/wp/v2/team_member')
      .map(response => response.json())
      .subscribe(
        data => this.data = data,
        err => console.log('error loading team'),
        () => callback()
      );
  }

  getData() {
    return this.data;
  }
}

