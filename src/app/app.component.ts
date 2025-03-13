import { Component, OnInit } from '@angular/core';
import { FirebaseMessagingService } from './firebase-messaging.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FirebaseMessagingService]
})
export class AppComponent implements OnInit {
  message: any;

  constructor(private firebaseService: FirebaseMessagingService) { }

  ngOnInit() {
    this.registerServiceWorker();
    this.firebaseService.requestPermission();
    this.firebaseService.receiveMessages();
    this.firebaseService.currentMessage.subscribe(msg => {
      this.message = msg;
    });


  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully with scope: ', registration.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration failed: ', err);
        });
    }
  }
}