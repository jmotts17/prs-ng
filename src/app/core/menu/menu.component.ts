import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User = new User();
  reviewIndex: number = 6;

  constructor(private sysSvc: SystemService) { }
  
  ngOnInit(): void {
    // Set user to currently logged in user
    this.user = this.sysSvc.loggedInUser;

    // Hides review menu option if user is not a reviewer
    if(!(this.user.reviewer)) {
      this.menuItems.splice(this.reviewIndex, 1);
    }
  }

  // Array of Menu Options
  menuItems : MenuItem[] = [
    new MenuItem("Home", "/home", "Home Page"),
    new MenuItem("About", "/about", "About Page"),
    new MenuItem("User", "/user-list", "User List"),
    new MenuItem("Vendor", "/vendor-list", "Vendor List"),
    new MenuItem("Product", "/product-list", "Product List"),
    new MenuItem("Request", "/request-list", "Request List"),
    new MenuItem("Review", "/request-review/{{this.user.id}}", "Review List"),
    new MenuItem("Login", "/user-login", "User Login")
  ];
}
