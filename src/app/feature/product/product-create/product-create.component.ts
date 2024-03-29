import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title = "Product Create";
  submitBtnTitle = "Create";
  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private sysSvc: SystemService,
              private router: Router,
              private loc: Location) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();
    
    // get list of vendors due to FK constraint
    this.vendorSvc.getAll().subscribe(
      resp => {
        this.vendors = resp as Vendor[];
      },
      err => {
        console.log(err);
      }
    );
  }

  save() {
    // save the product to the DB
    this.productSvc.create(this.product).subscribe(
      resp => {
        this.product = resp as Product;
        // forward to the product list component
        this.router.navigateByUrl("/product-list");
      },
      err => {
        console.log(err);
      }
    );
  }

  backClicked() {
    this.loc.back();
  }

}
