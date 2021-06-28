import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASEURL = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient) { }

  getAllUsers(): Observable<any>{
     return this.http.get(`${BASEURL}/getusers`);
  }

}
