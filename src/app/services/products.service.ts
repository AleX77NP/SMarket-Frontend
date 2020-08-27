import { Injectable } from '@angular/core';
import {Product} from '../models/product'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {productURL, productIdURL} from 'src/app/config/api'
import {catchError,tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {MessagerService} from 'src/app/services/message.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//products: Product[] = []

constructor(private http: HttpClient, private msg: MessagerService) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(productURL).pipe(
      tap(_=> this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts',[]))
    );
  }

  getById(id: number) : Observable<Product> {
    return this.http.get<Product>(`${productIdURL}?id=${id}`).pipe(
      tap(_=> this.log('fetched product')),
      catchError(this.handleErrorTwo)
    );
  }

  private log(message: string) {
    this.msg.add(`Product service: ${message}`);
  }

 private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
 
     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead
 
     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);
 
     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }

 handleErrorTwo(error: HttpErrorResponse) {
  console.log("Error! Somtehing went wrong.",error);
  alert(JSON.stringify(error.error))
  return throwError("Something went wrong");
 }

}