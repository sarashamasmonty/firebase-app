import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/firebase-config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private messaging: Messaging) {}
  
  requestPermission() {
    return getToken(this.messaging, { vapidKey: environment.firebase.vapidKey })
      .then(token => {
        console.log(token)
        if (token) {
          console.log('FCM Token:', token);
          localStorage.setItem('fcm_token', token);
        } else {
          console.log('No registration token available.');
        }
      })
      .catch(err => {
        console.error('Unable to get permission:', err);
      });
  }
  
  

  receiveMessages() {
    onMessage(this.messaging, payload => {
      console.log('Message received:', payload);
      this.currentMessage.next(payload);
    });
  }
}
