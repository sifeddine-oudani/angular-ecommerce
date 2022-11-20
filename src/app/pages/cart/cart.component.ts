import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  onClearAll(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart( item: CartItem ): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity( item: CartItem ): void {
    this.cartService.removeQuantity(item);
  }

  onAddQuantity( item: CartItem ): void {
    this.cartService.addToCart(item);
  }

  getTotal( items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

}
