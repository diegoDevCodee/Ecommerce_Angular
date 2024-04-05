import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ProductComponent,
    ProductCategoryComponent,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartServices = inject(CartService);

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  constructor() {}

  addToCart(product: Product) {
    this.cartServices.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {},
    });
  }

  private getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {},
    });
  }
}
