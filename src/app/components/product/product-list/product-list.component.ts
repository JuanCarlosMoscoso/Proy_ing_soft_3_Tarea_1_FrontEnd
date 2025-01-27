import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ICategory, IProduct, IRoleType } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnChanges {
  
  @Input() itemList: IProduct[] = [];
  @Input() canAddProduct : boolean = false;
  @Input() categories: ICategory[] = [];

  public selectedItem: IProduct = {};
  public productService: ProductService = inject(ProductService);
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canAddProduct']) {
      this.canAddProduct = changes['canAddProduct'].currentValue;    
    }
  }

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item};
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.productService.update(item);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }
}