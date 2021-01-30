import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { SystemService } from 'src/app/service/system.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = "Product List";
  products: Product[] = [];
  isNotAdmin = false;
  sortCriteria: string = "id";
  sortOrder: string = "asc";
  colClasses = "btn btn-link font-weight-bold";

  constructor(private productSvc: ProductService,
              private sysSvc : SystemService) { }

  ngOnInit(): void {
    // Check to see if there is a logged in user
    this.sysSvc.checkLogin();

    // Checks to see if the logged in user is an admin
    if(!(this.sysSvc.loggedInUser.admin)) {
      this.isNotAdmin = true;
    }

    // populate list of products
    this.productSvc.getAll().subscribe(
      resp => {
        this.products = resp as Product[];
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
