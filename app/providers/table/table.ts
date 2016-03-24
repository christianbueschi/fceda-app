import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Tableservice {

  private http: Http;
  private data: Object;

  constructor(http: Http) {
    this.http = http;
    this.data = Object;
  }

  retrieveData(callback: Function) {
    this.http.get('http://www.fceda.ch/app/rangliste.php')
      .subscribe(
        data => this.data = data,
        err => console.log('error while table loading'),
        () => callback()
      );
  }

  getData() {
    return this.data;
  }
}

