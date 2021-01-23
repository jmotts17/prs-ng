import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title = "PurchaseRequest Review";
  requests: Request[] = [];

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    // populate list of requests in review status
    this.requestSvc.review(this.sysSvc.loggedInUser.id).subscribe(
      resp => {
        this.requests = resp as Request[];
      },
      err => {
        console.log(err);
      }
    )
  }

}
