import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title = "User Edit";
  user: User = null;
  userId: number = 0;
  submitBtnTitle = "Save";
  isNotAdmin = false;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location,
              private sysSvc : SystemService ) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();

    // Checks to see if the logged in user is an admin
    if(!(this.sysSvc.loggedInUser.admin)) {
      this.isNotAdmin = true;
    }

    // get the id from the url
    this.route.params.subscribe(
      parms => {
        this.userId = parms['id'];
      });
    // get user by the user id
    this.userSvc.getById(this.userId).subscribe(
      resp => {
        this.user = resp as User;
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    // save the user to the DB
    this.userSvc.update(this.user).subscribe(
      resp => {
        this.user = resp as User;
        // forward to the user list component
        this.router.navigateByUrl("/user-list");
      },
      err => {
        console.log(err);
      }
    );
  }

  backClicked() {
    this.loc.back();
  }

}