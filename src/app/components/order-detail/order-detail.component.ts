import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/core/customers/customers.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { ProductsService } from 'src/app/core/products/products.service';
import { Customer, Order, ORDER_STATUS, SelectedProduct } from 'src/app/types/typing';
import { AddProductsModalComponent } from '../add-products-modal/add-products-modal.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public orderDetail!: Order;
  public customer!: Customer;
  public isEditable = true;

  constructor(
    private route:ActivatedRoute,
    private customersService: CustomersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({orderDetail}) => {
      if(orderDetail.status === ORDER_STATUS.PLACED){
        this.isEditable = false;
      }
      this.customersService.getCustomerById(orderDetail['customer-id'])
        .subscribe(customer => {
          this.orderDetail = orderDetail;
          this.customer = customer
        })
    })

  }

  productDescriptionById(productId: string): Observable<string>{
    return new Observable(observer => {
      this.productsService.getProductById(productId)
        .subscribe(product => {
          observer.next(product.description);
        })
    });
  }

  removeProduct(productId: string){
    this.ordersService.removeProductById(this.orderDetail.id, productId)
      .subscribe(order => {
        this.orderDetail = order;
      });
  }

  openAddProductsModal(){
    const modalRef = this.modalService.open(AddProductsModalComponent, {fullscreen: true});
    modalRef.result.then((items: SelectedProduct[]) => {
      this.ordersService.addProductsToOrder(this.orderDetail.id, items)
        .subscribe((order) => {
          this.orderDetail = order;
        });
    })
    .catch(err => {
      console.log(err);
    });
  }

  placeOrder(content: TemplateRef<HTMLElement>){
    this.ordersService.placeOrder(this.orderDetail.id)
      .subscribe(order => {
        this.modalService.open(content)
        .result.then((result) => {
          this.isEditable = false;
          this.orderDetail = order
          console.log(this.orderDetail.id, 'Order placed')
        })
        .catch(err => {
          console.log(err);
        });
      });
    
  }

  hasOrderPlaced(): boolean{
    return this.orderDetail.status === ORDER_STATUS.PLACED;
  }
}
