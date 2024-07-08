import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ProductFormComponent {
  @Input() product: IProduct = {};
  @Input() action = '';
  @Input() categories: ICategory[] = [];
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()
   
  callEvent() {
    this.callParentEvent.emit(this.product);
  }
}