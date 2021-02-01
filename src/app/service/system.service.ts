import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = null;

  constructor(private router: Router) { }

  isAdmin(): boolean {
    return (this.loggedInUser == null) ? false : this.loggedInUser.admin;
  }

  checkLogin(): void {
    // if user is not logged in, send to login page
    if(this.loggedInUser == null) {
      this.router.navigateByUrl("user-login");
    }
  }

}
