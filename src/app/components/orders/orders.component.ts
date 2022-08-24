import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/core/customers/customers.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Customer, Order, ORDER_STATUS } from 'src/app/types/typing';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];
  public customers: Customer[] = [];
  public customerHash: {[key: string] : Customer} = {};

  constructor(
    private ordersService: OrdersService,
    private customersService: CustomersService,
  ) { }

  ngOnInit(): void {
    this.ordersService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
      });
    this.customersService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        customers.forEach(customer => {
          this.customerHash[customer.id] = customer;
        })
      });
  }

  customerNameById(customerId: number): string{
    return this.customerHash[customerId]?.name;
  }

  getOrderStatus(order: Order){
    return order.status === ORDER_STATUS.PLACED ? 'PLACED' : 'PENDING';
  }

}
