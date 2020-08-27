import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { WorkersComponent } from './workers/workers.component';
import { ManagersComponent } from './managers/managers.component';
import { CouponsComponent } from './coupons/coupons.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { PlacesComponent } from './places/places.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { MycartComponent } from './mycart/mycart.component';
import {SignUpInComponent} from './sign-up-in/sign-up-in.component'


const routes: Routes = [
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'my-cart', component: MycartComponent},
  {path: '', redirectTo: '/product-list', pathMatch: 'full'},
  {path: 'sign-up-in', component: SignUpInComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'places', component: PlacesComponent},
  {path: 'warehouses', component: WarehousesComponent},
  {path: 'cashboxes', component: CashboxesComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'coupons', component: CouponsComponent},
  {path: 'managers', component: ManagersComponent},
  {path: 'workers', component:WorkersComponent},
  {path: 'supplies', component:SuppliesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'product-admin', component: ProductAdminComponent},
  {path: 'admin-orders', component: AdminOrdersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
