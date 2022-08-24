import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/core/products/products.service';
import { Product, SelectedProduct } from 'src/app/types/typing';
import { AddProductQuantityModalComponent } from '../add-product-quantity-modal/add-product-quantity-modal.component';

@Component({
  selector: 'app-add-products-modal',
  templateUrl: './add-products-modal.component.html',
  styleUrls: ['./add-products-modal.component.scss']
})
export class AddProductsModalComponent implements OnInit {

  public products!: Product[];
  public itemsToAdd:SelectedProduct[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    private productsService: ProductsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

  addProduct(product: Product){
    const modalRef = this.modalService.open(AddProductQuantityModalComponent);
    modalRef.componentInstance.selectedProduct = product;
    modalRef.result.then((productData) => {
      this.itemsToAdd.push(productData);
    })
    .catch(err => {
      console.log(err);
    });
  }



}
