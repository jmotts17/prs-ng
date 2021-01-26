import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title = "PurchaseRequest List";
  requests: Request[] = [];


  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    
      // populate list of requests
      this.requestSvc.getAll().subscribe(
        resp => {
          this.requests = resp as Request[];

          // Checks to see if the logged in user is an admin or reviewer
          // If they are neither, only show their requests
          if(!(this.sysSvc.loggedInUser.admin) && !(this.sysSvc.loggedInUser.reviewer)) { 
            for(let i = this.requests.length - 1; i >= 0; --i) {
              if(this.requests[i].user.id != this.sysSvc.loggedInUser.id) {
                console.log("index: ", i);
                this.requests.splice(i, 1);
              }
            }
          }

        },
        err => {
          console.log(err);
        }
      )
    
     
  }
  
}
