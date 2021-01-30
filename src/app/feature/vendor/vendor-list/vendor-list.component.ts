import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { SystemService } from 'src/app/service/system.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  title = "Vendor List";
  vendors: Vendor[] = [];
  isNotAdmin = false;
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private vendorSvc: VendorService,
              private sysSvc : SystemService) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();

    // Checks to see if the logged in user is an admin
    if(!(this.sysSvc.loggedInUser.admin)) {
      this.isNotAdmin = true;
    }
    
    // populate list of vendors
    this.vendorSvc.getAll().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
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
