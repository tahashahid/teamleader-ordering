import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class CanOrderDetailActivateService implements CanActivate {

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable(observer => {
      const orderId = Number(route.params['id']);
      this.ordersService.getOrderById(orderId)
        .subscribe(orderDetail => {
          if(orderDetail) {
            route.data = {orderDetail};
            observer.next(true)
          } else {
            observer.error(this.navigateToOrders());
          }
        }, () => {
          observer.error(this.navigateToOrders())
        });
      
      
    })
  }

  navigateToOrders(){
    this.router.navigate(['/orders']);
    return false;
  }
}


