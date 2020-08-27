import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MycartComponent } from './mycart/mycart.component';
import { CartColumnsComponent } from './components/cart-columns/cart-columns.component';
import { MycartItemComponent } from './components/mycart-item/mycart-item.component';
import { SignUpInComponent } from './sign-up-in/sign-up-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { PlacesComponent } from './places/places.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { CashboxesComponent } from './cashboxes/cashboxes.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ManagersComponent } from './managers/managers.component';
import { WorkersComponent } from './workers/workers.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    FooterComponent,
    NavbarComponent,
    MycartComponent,
    CartColumnsComponent,
    MycartItemComponent,
    SignUpInComponent,
    ProfileComponent,
    PlacesComponent,
    WarehousesComponent,
    CashboxesComponent,
    SuppliersComponent,
    CouponsComponent,
    ManagersComponent,
    WorkersComponent,
    SuppliesComponent,
    AboutComponent,
    ContactComponent,
    ProductDetailComponent,
    ProductAdminComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
