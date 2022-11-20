import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar: MatSnackBar) { }

  removeFromCart(item: CartItem, update: boolean = true): Array<CartItem> {
    const items = [...this.cart.value.items];
    const filterdedItems = items.filter((_item) => _item.id !== item.id );

    if (update) {
      this.cart.next({items: filterdedItems});
      this._snackBar.open( '1 item Removed from cart.', 'Ok', {duration:3000});
      console.log( this.cart.value );
    }


    return filterdedItems;

  }

  removeQuantity(item: CartItem):void {

    let itemForRemoval: CartItem | undefined;

    let filterdedItems = this.cart.value.items.map((_item) => {

      if ( _item.id === item.id ) {
        _item.quantity--;

        if ( _item.quantity === 0 ) {
          itemForRemoval = _item;
        }
      }

      return _item;

    });

    if ( itemForRemoval ) {
      filterdedItems = this.removeFromCart(itemForRemoval, false);
    }
    
    this.cart.next({items: filterdedItems});
    this._snackBar.open( '1 item Removed from cart.', 'Ok', {duration:3000});

  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item) => _item.id === item.id);
    if( itemsInCart ) {
      itemsInCart.quantity += 1;
    } else {
      items.push( item );
    }
    this.cart.next({items});
    this._snackBar.open( '1 item added to cart.', 'Ok', {duration:3000});
    console.log( this.cart.value );
  }

  getTotal( items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity ).reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

}
