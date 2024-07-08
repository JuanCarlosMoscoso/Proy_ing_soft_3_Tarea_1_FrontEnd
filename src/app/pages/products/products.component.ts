import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IProduct, IRoleType } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl:'./products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  public showModal = false;
  public canAddProduct = false;
  public routeAuthorities: string[] =  [];
  
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public authService: AuthService =  inject(AuthService);
  public route: ActivatedRoute = inject(ActivatedRoute);

  @ViewChild('addModal') addModal!: ModalComponent;
  
  ngOnInit(): void {
    this.productService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.canAddProduct = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }
  
  handleFormAction(item: IProduct) {
    this.productService.create(item);
  }

  showAddModal() {
    this.categoryService.getAll();
    this.addModal.show();
  }
}