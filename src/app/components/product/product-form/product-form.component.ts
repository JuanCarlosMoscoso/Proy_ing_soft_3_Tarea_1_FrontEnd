import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct, ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges {
  

  @Input() product: IProduct = {};
  @Input() action = '';
  @Input() categories: ICategory[] = [];
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.product = changes['product'].currentValue;
      this.product.categoryId = this.product.category?.id;
    }
  }

  callEvent() {
    // Update the product category
    this.product.category = this.categories.find(i => i.id?.toString() === this.product.categoryId);    
    this.callParentEvent.emit(this.product);
  }
}