import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product | undefined;


  constructor(private storeService: StoreService, private route: ActivatedRoute,private cartService: CartService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.onGetProduct(params['id']);
    });

    
  }

  onGetProduct(id: number): void {
    this.storeService.getProduct(id).subscribe((_product) => {
      console.log( _product );
      this.product = _product;
    });
  }

  onAddToCart( item: Product ): void {
    this.cartService.addToCart({
      product: item.image,
      name: item.title,
      price: item.price,
      quantity: 1,
      id: item.id
    });
  }

}
