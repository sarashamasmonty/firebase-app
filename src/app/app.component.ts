import { Component, OnInit } from '@angular/core';
import { FirebaseMessagingService } from './firebase-messaging.service';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FirebaseMessagingService]
})
export class AppComponent implements OnInit {
  message: any;
  notifications: any[] = []; 

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

  addNotification(notification: any) {
    // Add the new notification to the array
    this.notifications.unshift({
      title: notification.title,
      body: notification.body,
      timestamp: new Date() // Add a timestamp for display
    });

    // Optional: Limit the number of notifications displayed
    if (this.notifications.length > 10) {
      this.notifications.pop(); // Remove the oldest notification
    }
  }
}