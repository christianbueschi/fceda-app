import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

declare const feathers;
declare const io;


@Injectable()
export class Livetickerservice {

  private http: Http;
  private data: String;
  private params: String;
  
  public notifications$: Observable<any[]>;
  private notificationObserver: any;
  
  private dataStore: {
    notifications: any[]
  };

  constructor(http: Http) {
    this.http = http;
    this.data = null;
    this.params = 'dayOfCreation=' + this.getToday() + '&$sort[createdAt]=-1';
    
    this.notifications$ = new Observable(observer => this.notificationObserver = observer)
      .share();
    
    this.dataStore = { notifications: [] };
    
    this.createSocket();
  }

  retrieveData(callback: Function) {
    this.http.get('https://fceda-liveticker-service.herokuapp.com/notifications?' + this.params)
      .map(response => response.json())
      .subscribe(
        data => {
          this.dataStore.notifications = this.sortData(data.data);
          if(data.data.length > 0) {
             this.notificationObserver.next(this.dataStore.notifications) 
          }
        },
        err => console.log('error while loading news'),
        () => callback()
    );
  }
  
  /**
   * Sort Array
   * Elemnts prop 'isTitle' has to be on first position, the rest in descending order 
   * 1,2,title,4,5 -> title,5,4,2,1
   * 
   */
  sortData(data) {
    let notTitles = data.filter(this.isNotTitle);
    let titles = data.filter(this.isTitle);
    notTitles.unshift(titles[0]); // take only one title
    return notTitles;
  }
  
  isTitle(data) {
    if(!data) return data;
    return data.isTitle;
  }
  
  isNotTitle(data) {
    if(!data) return data;
    return data.isTitle != true;
  }
  
  createSocket() {
    let socket = io('https://fceda-liveticker-service.herokuapp.com');
    let app = feathers().configure(feathers.socketio(socket));

    let notificationService = app.service('notifications');
    notificationService.on('created', (notification) => this.onNotificationCreated(notification));
  }
  
  onNotificationCreated(notification) {
    this.dataStore.notifications.unshift(notification); // add new notification on 1st index
    this.dataStore.notifications = this.sortData(this.dataStore.notifications);
    this.notificationObserver.next(this.dataStore.notifications);
  }
  
  getToday() {
    let today = new Date();
    today.setTime( today.getTime() + today.getTimezoneOffset()*60*1000 );
    let dd = String(today.getDate());
    let mm = String(today.getMonth()+1); //January is 0!
    let yyyy = today.getFullYear();

    if(+dd<10) {
        dd = '0'+dd;
    } 

    if(+mm<10) {
        mm = '0'+mm;
    }  
    
    return dd+'-'+mm+'-'+yyyy;
 }

  getData() {
    return this.data;
  }
}

