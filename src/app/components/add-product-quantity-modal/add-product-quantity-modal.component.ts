import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/types/typing';

@Component({
  selector: 'app-add-product-quantity-modal',
  templateUrl: './add-product-quantity-modal.component.html',
  styleUrls: ['./add-product-quantity-modal.component.scss']
})
export class AddProductQuantityModalComponent implements OnInit {
  @Input() selectedProduct!: Product;

  public productQuantity = new FormControl(1, [Validators.required, Validators.min(1)]);

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  getTotalPrice(): number{
    if(this.productQuantity.valid){
      const total = (this.productQuantity.value * this.selectedProduct.price).toFixed(2)
      return Number(total);
    }
    return 0;
  }

  closeModal(quantity: number){
    this.activeModal.close({
      quantity,
      "product-id": this.selectedProduct.id,
      "unit-price": this.selectedProduct.price,
      "total": this.getTotalPrice(),
    })
  }

}
