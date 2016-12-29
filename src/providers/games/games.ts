import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Gamesservice {

  private http: Http;
  private data: Object;

  constructor(http: Http) {
    this.http = http;
    this.data = Object;
  }

  retrieveData(callback: Function) {
    this.http.get('http://www.fceda.ch/app/tabelle.php')
      .subscribe(
        data => this.data = data,
        err => console.log('error while games loading'),
        () => callback()
      );
  }

  getData() {
    return this.data;
  }
}

