export enum ORDER_STATUS {'PLACED', 'PENDING'}


export interface Order {
  "id": number;
  "items": SelectedProduct[],
  "total": number,
  "status"?: ORDER_STATUS,
  "customer-id": number;
}

export interface SelectedProduct {
  "product-id": string,
  "unit-price": number,
  "quantity": number,
  "total": number
}

export interface Customer{
  "id": number,
  "name": string,
  "since": string,
  "revenue": number
}

export interface Product{
  "id": string,
  "description": string,
  "category": number,
  "price": number
}
