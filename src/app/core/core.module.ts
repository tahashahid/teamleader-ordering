import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './orders/orders.service';
import { CustomersService } from './customers/customers.service';
import { ProductsService } from './products/products.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  providers: [
    OrdersService,
    CustomersService,
    ProductsService,
  ]
})
export class CoreModule { }
