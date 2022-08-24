import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, ORDER_STATUS, SelectedProduct } from 'src/app/types/typing';
import { ORDERS } from './orders';

@Injectable()
export class OrdersService {
  orders = ORDERS;
  
  constructor() { }
  
  getOrders(): Observable<Order[]> {
    return new Observable(observer => {
      observer.next(this.orders);
    })
  }

  getOrderById(orderId: number): Observable<Order> {
    return new Observable(observer => {
      const order = this.orders.find(order => order.id === orderId);
      observer.next(order)
    });
  }

  placeOrder(orderId: number): Observable<Order> {
    return new Observable(observer => {
      const order = this.orders.find(order => order.id === orderId) as Order;
      order.status = ORDER_STATUS.PLACED;
      observer.next(order);
    })
  }

  removeProductById(orderId: number, productId: string): Observable<Order> {
    return new Observable(observer => {
      const order = this.orders.find(order => order.id === orderId) as Order;
      const productIndex = order.items.findIndex(product => product['product-id'] === productId);
      if(productIndex+1){
        const removedItem = order.items.splice(productIndex, 1)[0];
        const total = (order.total - removedItem.total).toFixed(2);
        order.total = Number(total);
        observer.next(order);
      } else {
        observer.error('product not found!!!');
      }
    })
  }

  addProductsToOrder(orderId: number, items: SelectedProduct[]): Observable<Order> {
    return new Observable(observer => {
      const order = this.orders.find(order => order.id === orderId) as Order;
      order.items.push(...items);
      const total = items.reduce((oldVal, newVal) => {
        return oldVal + newVal.total;
      }, order.total).toFixed(2);
      order.total = Number(total);
      observer.next(order);
    });
  }
}
