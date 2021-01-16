import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../app/feature/user/user-list/user-list.component';
import { UserCreateComponent } from '../app/feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';

const routes: Routes = [
  {path: "user-list", component: UserListComponent },
  {path: "user-create", component: UserCreateComponent },
  {path: "user-detail/:id", component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
