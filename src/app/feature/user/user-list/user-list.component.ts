import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { User } from '../../../model/user.class';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title = "User List";
  users: User[] = [];
  isNotAdmin = false;
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private userSvc : UserService,
              private sysSvc : SystemService) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();

    // Checks to see if the logged in user is an admin
    if(!(this.sysSvc.loggedInUser.admin)) {
      this.isNotAdmin = true;
    }

    // populate list of users
    this.userSvc.getAll().subscribe(
      resp => {
        this.users = resp as User[];
      },
      err => {
        console.log(err);
      }
    )
  }

  sortBy(column: string): void {
    console.log("movie list sortBy called")
    if(column == this.sortCriteria){
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }

}
