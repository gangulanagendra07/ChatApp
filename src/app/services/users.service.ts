import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASEURL = 'http://localhost:3000/api/users';
const BASEURLFRIENDS = 'http://localhost:3000/api/friends';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/getusers`);
  }

  getById(id): Observable<any> {
    return this.http.get(`${BASEURL}/getusers/${id}`);
  }

  getUserByName(username): Observable<any> {
    return this.http.get(`${BASEURL}/getusername/${username}`);
  }

  followUser(userFollowed): Observable<any> {
    return this.http.post(`${BASEURLFRIENDS}/friendship`, { userFollowed });
  }

  unfollowUser(userFollowed): Observable<any> {
    return this.http.post(`${BASEURLFRIENDS}/unfriends`, { userFollowed });
  }

  MarkNotification(id, deleteVal?): Observable<any> {
    return this.http.post(`${BASEURLFRIENDS}/marknotification/${id}`, {
      id,
      deleteVal
    });
  }

}
