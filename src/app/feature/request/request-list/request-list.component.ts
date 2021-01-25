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
      },
      err => {
        console.log(err);
      }
    )
  }

}
