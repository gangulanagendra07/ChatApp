import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  SendMessage(senderId, receiverId, receiverName, message): Observable<any> {

    return this.http.post(`${BASEURL}/chat-message/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    });
  }

  GetAllMessages(senderId, receiverId): Observable<any> {

    return this.http.get(`${BASEURL}/chat-message/${senderId}/${receiverId}`);
  }

  MarkMessages(sender, receiver): Observable<any> {

    return this.http.get(`${BASEURL}/receiver-message/${sender}/${receiver}`);
  }

  MarkAllMessages(): Observable<any> {

    return this.http.get(`${BASEURL}/mark-all-messages`);
  }
}
