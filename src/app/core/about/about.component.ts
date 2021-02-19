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
  counter: number = 1;
  sqlHidden = true;
  javaHidden = true;
  springHidden = true;
  hibernateHidden = true;
  jsonHidden = true;
  htmlHidden = true;
  cssHidden = true;
  tsHidden = true;
  angularHidden = true;

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

  // changes image flag to true and increments counter
  displayImage() {
    switch(this.counter) {
      case 1: this.sqlHidden = false;
        break;
      case 2: this.javaHidden = false;
        break;
      case 3: this.springHidden = false;
        break;  
      case 4: this.hibernateHidden = false;
        break;
      case 5: this.jsonHidden = false;
        break;
      case 6: this.htmlHidden = false;
        break;
      case 7: this.cssHidden = false;
        break;
      case 8: this.tsHidden = false;
        break;
      case 9: this.angularHidden = false;
        break;
    }
    this.counter++;
  }

}
