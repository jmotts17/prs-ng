import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../app/feature/user/user-list/user-list.component';
import { UserCreateComponent } from '../app/feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';

const routes: Routes = [
  { path: "user-list", component: UserListComponent },
  { path: "user-create", component: UserCreateComponent },
  { path: "user-detail/:id", component: UserDetailComponent },
  { path: "user-edit/:id", component: UserEditComponent },
  { path: "vendor-list", component: VendorListComponent },
  { path: "vendor-detail/:id", component: VendorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
