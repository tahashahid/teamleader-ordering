import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/types/typing';
import { CUSTOMERS } from './customers';

@Injectable()
export class CustomersService {
  customers = CUSTOMERS;
  
  constructor() { }
  
  getCustomers(): Observable<Customer[]>  {
    return new Observable(observer => {
      observer.next(this.customers);
    })
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return new Observable(observer => {
      const customer = this.customers.find(customer => customer.id === customerId);
      observer.next(customer);
    })
  }

}
