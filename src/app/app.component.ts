import { Component, OnInit, Input } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @Input() location: string;
  @Input() unit: string;
  title = 'MobApp-angular-pwa';
  public errText = '';
  public weathersubscription;
  public temp: number;
  public desc: string;
  public weatherico: string;
  public country: string;
  public city: string;
  public dt: Date;
  readonly VAPID_PUBLIC_KEY = 'BM3mMrHOatC5mA1Sf7A7rHl-5u5x5BrfT6wqj2KKizzNjisJjWv0-FHKXKPyIci8WqL0wZ1Bo_xmIi2EadqN9Cw';
  constructor(
    public _ws: NotificationService,
    private swUpdate: SwUpdate,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this.reloadCache();
  }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available! would you like to update?')) {
          window.location.reload();
        }
      });
    }
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      console.log("..if");
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          console.log("Done");
          this._ws.postSubscription(sub).subscribe();
        })
        .catch(err => {
          console.log("=>>>", err)
        });
    }
    console.log("..");

  }

  
  // renderWeather() {
  //   this.weathersubscription = this._ws.getWeather(this.location, this.unit).subscribe((data) => {
  //     this.errText = '';
  //     this.temp = Math.round(data.main.temp);
  //     this.desc = data.weather[0].description;
  //     this.weatherico = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
  //     this.city = data.name;
  //     this.country = data.sys.country;
  //     this.getLocalTime(data.coord.lat, data.coord.lon);

  //   }, error => {
  //     this.errText = error;
  //   });
  // }

  // getLocalTime(lat, long) {
  //   this._ws.getLocalTime(lat, long).subscribe((data) => {
  //     this.dt = data.time;
  //   });
  // }

  // ngOnChanges(changes: any) {
  //   if (changes['location'] || changes['unit']) {
  //     if (this.weathersubscription) {
  //       this.weathersubscription.unsubscribe();
  //     }
  //     this.renderWeather();
  //   }
  // }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log("unsubscribe");
    
    this.swPush.unsubscribe()
  }
  
}


/**
 * function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }
  
    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
  
        // Whatever the user answers, we make sure we store the information
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }
  
        // If the user is okay, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    } else {
      alert(`Permission is ${Notification.permission}`);
    }
  
    // At last, if the user already denied any notification, and you 
    // want to be respectful there is no need to bother him any more.
  }
 */