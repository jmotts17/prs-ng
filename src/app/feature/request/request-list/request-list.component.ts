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
  isHidden = false;
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";


  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();
    
    // populate list of requests
    this.requestSvc.getAll().subscribe(
      resp => {
        this.requests = resp as Request[];

        // Checks to see if the logged in user is an admin or reviewer
        // If they are neither, only show their requests
        if(!(this.sysSvc.loggedInUser.admin) && !(this.sysSvc.loggedInUser.reviewer)) { 
          for(let i = this.requests.length - 1; i >= 0; --i) {
            if(this.requests[i].user.id != this.sysSvc.loggedInUser.id) {
              this.requests.splice(i, 1);
            }
          }
        }

        // If the request array is empty, isHidden is true
        // Else set request userName property for sorting
        if(this.requests.length === 0) {
          this.isHidden = true;
        } else {
          for(let request of this.requests) {
            request.userName = request.user.userName;
          }
        }

      },
      err => {
        console.log(err);
      }
    ) 
  }

  sortBy(column: string): void {
    if(column == this.sortCriteria){
      this.sortOrder = (this.sortOrder == "desc") ? "asc" : "desc";
    }
    this.sortCriteria = column;
  }
  
}
