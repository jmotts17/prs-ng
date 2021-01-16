import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.class';

const URL = "http://localhost:8080/users";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // service functions
  // get all users
  getAll() : Observable<User[]> {
    return this.http.get(URL+'/') as Observable<User[]>;
  }
}
