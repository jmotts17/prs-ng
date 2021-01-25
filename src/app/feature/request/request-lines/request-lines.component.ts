import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from '../../../service/line-item.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  requestTitle = "PurchaseRequest Line Items";
  linesTitle = "Lines";
  request: Request = null;
  lineItems: LineItem[] = [];
  lineItem: LineItem = new LineItem();
  isHidden = false;
  isDisabled = false;
  requestId = 0;

  constructor(private lineItemSvc: LineItemService,
              private requestSvc: RequestService,
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

        // Disable Submit for Review Button if in Review Status
        if(this.request.status === "Review") {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      },
      err => {
        console.log(err);
      }
    )

    // get the line items by request id
    this.lineItemSvc.getLineItemsByRequestId(this.requestId).subscribe(
      resp => {
        this.lineItems = resp as LineItem[];
        // Set flag to true if no lineItems
        if(this.lineItems.length === 0) {
          this.isHidden = true;
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  // Delete a lineitem from the request
  delete(lineItemId: number) {
    // delete the product from the DB
    this.lineItemSvc.delete(lineItemId).subscribe(
      resp => {
        this.lineItem = resp as LineItem;
        // reload current page
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  // Submit a request for review
  submit() {
    this.requestSvc.submit(this.request).subscribe(
      resp => {
        this.request = resp as Request;
        // forward to the request list component
        this.router.navigateByUrl("/request-list");
      },
      err => {
        console.log(err);
      }
    );
  }

}
