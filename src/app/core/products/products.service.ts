import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/types/typing';
import { PRODUCTS } from './products';

@Injectable()
export class ProductsService {
  products = PRODUCTS;
  
  constructor() { }
  
  getProducts(): Observable<Product[]> {
    return new Observable(observer => {
      observer.next(this.products);
    })
  }

  getProductById(productId: string): Observable<Product> {
    return new Observable(observer => {
      const product = this.products.find(product => product.id === productId)
      observer.next(product)
    });
  }

}
