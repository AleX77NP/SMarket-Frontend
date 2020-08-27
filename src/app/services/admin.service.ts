import { Product } from './../models/product';
import { Category } from './../models/category';
import { Supply } from './../models/supply';
import { WorkerC } from './../models/worker-c';
import { Coupon } from './../models/coupon';
import { Supplier } from './../models/supplier';
import { Cashbox } from './../models/cashbox';
import { warehousesURL, newWareURL, updateWareURL, deleteWareURL} from './../config/api';
import { Injectable } from '@angular/core';
import {Place} from '../models/place'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {placesURL,newPlaceURL, deletePlaceURL, updatePlaceURL} from 'src/app/config/api'
import {catchError,tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {MessagerService} from 'src/app/services/message.service'
import { Warehouse } from '../models/warehouse';
import {cashboxesURL, newCashboxURL, updateCashboxURL, deleteCashboxURL} from 'src/app/config/api'
import {suppliersURL, newSupplierURL, updateSupplierURL, deleteSupplierURL} from './../config/api';
import {couponsURL, newCouponURL, updateCouponURL, deleteCouponURL} from './../config/api';
import { Manager } from '../models/manager';
import {managersURL, newManagerURL, updateManagerURL, deleteManagerURL} from './../config/api';
import {workersURL,newWorkerURL,updateWorkerURL,deleteWorkerURL} from './../config/api';
import {suppliesURL, newSupplyURL, updateSupplyURL, deleteSupplyURL} from './../config/api'
import {categoriesURL, newCatURL} from './../config/api';
import {updateProductURL, deleteProductURL, newProductURL, allOrdersURL, deleteOrderURL, checkAdminURL} from './../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUsers: any[] = [];

  constructor(private http: HttpClient, private msg: MessagerService) { 
  }

getCategories() :Observable<Category[]> {
  return this.http.get<Category[]>(categoriesURL).pipe(
    tap(_=> this.log('fetched categories')),
    catchError(this.handleError<Category[]>('getCategories',[]))
  );
}

getPlaces() : Observable<Place[]> {
      return this.http.get<Place[]>(placesURL).pipe(
        tap(_=> this.log('fetched places')),
        catchError(this.handleError<Place[]>('getPlaces',[]))
      );
  }

createPlace(place: Place):Observable<Place> {
    return this.http.post<Place>(newPlaceURL,JSON.stringify(place)).pipe(
      tap(_=> this.log('Place added!')),
        catchError(this.handleErrorTwo))
  }
deletePlace(id: number):Observable<any>{
    return this.http.get<Place>(`${deletePlaceURL}?id=${id}`).pipe(
      tap(_=> this.log('Place deleted!')),
        catchError(this.handleError))
  }

updatePlace(place: Place) {
    return this.http.post<Place>(updatePlaceURL,JSON.stringify(place)).pipe(
      tap(_=> this.log('Place updated!')),
        catchError(this.handleErrorTwo));
  }

getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(warehousesURL).pipe(
      tap(_=> this.log('fetched warehouses')),
      catchError(this.handleError<Warehouse[]>('getWarehouses',[]))
    );
  }

createWarehouse(warehouse: Warehouse):Observable<Warehouse> {
    return this.http.post<Warehouse>(newWareURL,JSON.stringify(warehouse)).pipe(
      tap(_=> this.log('Warehouse added!')),
        catchError(this.handleErrorTwo))
  }

updateWarehouse(warehouse: Warehouse) {
    return this.http.post<Warehouse>(updateWareURL,JSON.stringify(warehouse)).pipe(
      tap(_=> this.log('Warehouse updated!')),
        catchError(this.handleErrorTwo));
}

deleteWarehouse(id: number):Observable<any>{
  return this.http.get<Warehouse>(`${deleteWareURL}?id=${id}`).pipe(
    tap(_=> this.log('Warehouse deleted!')),
      catchError(this.handleError))
}

getCashboxes(): Observable<Cashbox[]> {
  return this.http.get<Cashbox[]>(cashboxesURL).pipe(
    tap(_=> this.log('fetched warehouses')),
    catchError(this.handleError<Cashbox[]>('getCashboxes',[]))
  );
}

createCashbox(cashbox: Cashbox):Observable<Cashbox> {
  return this.http.post<Cashbox>(newCashboxURL,JSON.stringify(cashbox)).pipe(
    tap(_=> this.log('Cashbox added!')),
      catchError(this.handleErrorTwo))
}

updateCashbox(cashbox: Cashbox) {
  return this.http.post<Cashbox>(updateCashboxURL,JSON.stringify(cashbox)).pipe(
    tap(_=> this.log('Cashbox updated!')),
      catchError(this.handleErrorTwo));
}

deleteCashbox(id: number):Observable<any>{
  return this.http.get<Cashbox>(`${deleteCashboxURL}?id=${id}`).pipe(
    tap(_=> this.log('Cashbox deleted!')),
      catchError(this.handleError))
}

getSuppliers(): Observable<Supplier[]> {
  return this.http.get<Supplier[]>(suppliersURL).pipe(
    tap(_=> this.log('fetched suppliers')),
    catchError(this.handleError<Supplier[]>('getSuppliers',[]))
  );
}

createSupplier(supplier: Supplier):Observable<Supplier> {
  return this.http.post<Supplier>(newSupplierURL,JSON.stringify(supplier)).pipe(
    tap(_=> this.log('Supplier added!')),
      catchError(this.handleErrorTwo))
}

updateSupplier(supplier: Supplier) {
  return this.http.post<Cashbox>(updateSupplierURL,JSON.stringify(supplier)).pipe(
    tap(_=> this.log('Supplier updated!')),
      catchError(this.handleErrorTwo));
}

deleteSupplier(id: number):Observable<any>{
  return this.http.get<Supplier>(`${deleteSupplierURL}?id=${id}`).pipe(
    tap(_=> this.log('Supplier deleted!')),
      catchError(this.handleError))
}

getCoupons(): Observable<Coupon[]> {
  return this.http.get<Coupon[]>(couponsURL).pipe(
    tap(_=> this.log('fetched coupons')),
    catchError(this.handleError<Coupon[]>('getCoupnos',[]))
  );
}

createCoupon(coupon: Coupon):Observable<Coupon> {
  return this.http.post<Coupon>(newCouponURL,JSON.stringify(coupon)).pipe(
    tap(_=> this.log('Coupon added!')),
      catchError(this.handleErrorTwo))
}
updateCoupon(coupon: Coupon){
  return this.http.post<Coupon>(updateCouponURL,JSON.stringify(coupon)).pipe(
    tap(_=> this.log('Coupon updated!')),
      catchError(this.handleErrorTwo))
}

deleteCoupon(id: number):Observable<any>{
  return this.http.get<Coupon>(`${deleteCouponURL}?id=${id}`).pipe(
    tap(_=> this.log('Coupon deleted!')),
      catchError(this.handleError))
}

getManagers(): Observable<Manager[]> {
  return this.http.get<Manager[]>(managersURL).pipe(
    tap(_=> this.log('fetched managers')),
    catchError(this.handleError<Manager[]>('getManagers',[]))
  );
}

createManager(manager: Manager):Observable<Manager> {
  return this.http.post<Manager>(newManagerURL,JSON.stringify(manager)).pipe(
    tap(_=> this.log('Manager added!')),
      catchError(this.handleErrorTwo))
}

updateManager(manager: Manager) {
  return this.http.post<Manager>(updateManagerURL,JSON.stringify(manager)).pipe(
    tap(_=> this.log('Manager updated!')),
      catchError(this.handleErrorTwo))
}

deleteManager(id:number) {
  return this.http.get<Manager>(`${deleteManagerURL}?id=${id}`).pipe(
    tap(_=> this.log('Manager deleted!')),
      catchError(this.handleErrorTwo))
}

getWorkers(): Observable<WorkerC[]> {
  return this.http.get<WorkerC[]>(workersURL).pipe(
    tap(_=> this.log('fetched workers')),
    catchError(this.handleError<WorkerC[]>('getWorkers',[]))
  );
}

createWorker(worker:WorkerC):Observable<WorkerC> {
  return this.http.post<WorkerC>(newWorkerURL,JSON.stringify(worker)).pipe(
    tap(_=> this.log('Worker added!')),
      catchError(this.handleErrorTwo))
}

updateWorker(worker:WorkerC){
  return this.http.post<WorkerC>(updateWorkerURL,JSON.stringify(worker)).pipe(
    tap(_=> this.log('Worker updated!')),
      catchError(this.handleErrorTwo))
}

deleteWorker(id:number) {
  return this.http.get<WorkerC>(`${deleteWorkerURL}?id=${id}`).pipe(
    tap(_=> this.log('Worker deleted!')),
      catchError(this.handleErrorTwo))
}

getSupplies():Observable<Supply[]> {
  return this.http.get<Supply[]>(suppliesURL).pipe(
    tap(_=> this.log('fetched supplies')),
    catchError(this.handleError<Supply[]>('getSupplies',[]))
  );
}

createSupply(supply: Supply): Observable<Supply> {
  return this.http.post<Supply>(newSupplyURL,JSON.stringify(supply)).pipe(
    tap(_=> this.log('Supply added!')),
      catchError(this.handleErrorTwo))
}

updateSupply(supply: Supply) {
  return this.http.post<Supply>(updateSupplyURL,JSON.stringify(supply)).pipe(
    tap(_=> this.log('Supply updated!')),
      catchError(this.handleErrorTwo))
}

deleteSupply(id:number) {
  return this.http.get<Supply>(`${deleteSupplyURL}?id=${id}`).pipe(
    tap(_=> this.log('Supply deleted!')),
      catchError(this.handleErrorTwo))
}

createProduct(product: Product): Observable<Product> {
   return this.http.post<Product>(newProductURL,JSON.stringify(product)).pipe(
    tap(_=> this.log('Product added!')),
      catchError(this.handleErrorTwo))
}

updateProduct(product: Product) {
  return this.http.post<Product>(updateProductURL,JSON.stringify(product)).pipe(
    tap(_=> this.log('Product updated!')),
      catchError(this.handleErrorTwo))
}

deleteProduct(id: number) {
  return this.http.get<Product>(`${deleteProductURL}?id=${id}`).pipe(
    tap(_=> this.log('Product deleted!')),
      catchError(this.handleErrorTwo))
}

createCategory(cat: Category) {
  return this.http.post<Category>(newCatURL, JSON.stringify(cat)).pipe(
    tap(_=> this.log('Category added!')),
      catchError(this.handleErrorTwo))
}
getAllOrders() :Observable<any>{
  return this.http.get(allOrdersURL).pipe(
    tap(_=> this.log('all orders success!')),
    catchError(this.handleError)
  )
}

deleteOrder(id: number) {
  return this.http.get(`${deleteOrderURL}?id=${id}`).pipe(
    tap(_=> this.log('Order deleted!')),
      catchError(this.handleError))
}


checkAdmins(name) {
  let count = 0;
 this.adminUsers.forEach(admin => {
   if(admin.user == name)
   count ++;
 });
 return count>1?true:false;
}

private log(message: string) {
    this.msg.add(`Product service: ${message}`);
  }

private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
 
     console.error(error); 
 
     this.log(`${operation} failed: ${error.message}`);
 
     return of(result as T);
   };
 }

 handleErrorTwo(error: HttpErrorResponse) {
  console.log("Error! Somtehing went wrong.",error);
  alert(JSON.stringify(error.error))
  return throwError("Something went wrong");
 }
 

}
