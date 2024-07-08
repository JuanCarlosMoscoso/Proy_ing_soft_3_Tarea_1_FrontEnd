import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory, IRoleType } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnChanges { 
  @Input() itemList: ICategory[] = [];
  @Input() canAddCategory : boolean = false;

  public selectedItem: ICategory = {};  
  public categoryService: CategoryService = inject(CategoryService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canAddCategory']) {
      this.canAddCategory = changes['canAddCategory'].currentValue;    
    }
  }

  showDetailModal(item: ICategory, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: ICategory) {
    this.categoryService.update(item);
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }
}
