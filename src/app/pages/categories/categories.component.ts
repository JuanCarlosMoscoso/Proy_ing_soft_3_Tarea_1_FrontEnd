import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ICategory, IRoleType } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  public canAddCategory = false;
  public routeAuthorities: string[] =  [];
  public categoryService: CategoryService = inject(CategoryService);
  public authService: AuthService =  inject(AuthService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  
  @ViewChild('addModal') addModal!: ModalComponent;
   
  ngOnInit(): void {
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.canAddCategory = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  handleFormAction(item: ICategory) {
    this.categoryService.create(item);
  }

  showAddModal() {
    this.addModal.show();
  }
}