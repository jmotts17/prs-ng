import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = "PRS Overview";
  user: User = new User();
  userId: number = 0;

  constructor(private userSvc: UserService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
        // Check to see if there is a logged in user
        this.sysSvc.checkLogin();

        // get user by user id
        this.userSvc.getById(this.sysSvc.loggedInUser.id).subscribe(
          resp => {
            this.user = resp as User;
          },
          err => {
            console.log(err);
          }
        );
  }

}
