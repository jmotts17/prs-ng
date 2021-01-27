import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title = "User Detail";
  user: User = null;
  userId: number = 0;

  constructor(private userSvc: UserService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();

    // get the id from the url
    this.route.params.subscribe(
      parms => {
        this.userId = parms['id'];
      });
    // get user by user id
    this.userSvc.getById(this.userId).subscribe(
      resp => {
        this.user = resp as User;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete() {
    // delete the user from the DB
    this.userSvc.delete(this.user.id).subscribe(
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

}
