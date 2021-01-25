import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from '../../../service/line-item.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  requestTitle = "PurchaseRequest Approve/Reject";
  linesTitle = "Lines";
  approveBtn = "Approve";
  rejectBtn = "Reject";
  request: Request = null;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
  requestId = 0;

  constructor(private lineItemSvc: LineItemService,
              private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the id from the url
    this.route.params.subscribe(
      parms => {
        this.requestId = parms['id'];
      });

    // get the request by the request id
    this.requestSvc.getById(this.requestId).subscribe(
      resp => {
        this.request = resp as Request;
      },
      err => {
        console.log(err);
      }
    )

    // get the line items by request id
    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      resp => {
        this.lineItems = resp as LineItem[];
      },
      err => {
        console.log(err);
      }
    )
  }

  // Approve a request
  approve() {
    this.requestSvc.approve(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        // forward to request review
        this.router.navigateByUrl("/request-review/"+this.sysSvc.loggedInUser.id)
      }
    )
  }

  // Reject a request
  reject() {
    this.requestSvc.reject(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        // forward to request review
        this.router.navigateByUrl("/request-review/"+this.sysSvc.loggedInUser.id)
      }
    )
  }

}
