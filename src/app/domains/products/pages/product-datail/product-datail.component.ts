import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-datail',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-datail.component.html',
  styleUrl: './product-datail.component.css',
})
export default class ProductDatailComponent {
  @Input() id?: string;

  product = signal<Product | null>(null);

  cover = signal('');

  private productService = inject(ProductService);
  private cartService = inject(CartService)

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
      });
    }
  }

  changeCover(newImage: string) {
    this.cover.set(newImage)
  }

  addToCart() {
    const product = this.product()
    if (product) {
      this.cartService.addToCart(product)
    }
    
  }


}
