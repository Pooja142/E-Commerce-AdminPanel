
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../../services/category/category.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Category {
  id: number;
  name: string;
  images: string[];
  price: number;
  unit: number;
  is_active: number;
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'images', 'price', 'unit', 'is_active', 'edit', 'delete'];
  categories: Category[] = [];
  selectedFilterCategory: string | number = 'all';

  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  applyFilter() {
    if (this.selectedFilterCategory === 'all') {
      this.getCategories();
    } else {
      const categoryName = this.selectedFilterCategory as string;
      this.categoryService.getCategoriesByName(categoryName).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response: any) => {
          console.log(response);
          this.categories = response.filter((category: Category) => category.name === categoryName);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  
  
  getDistinctCategoryNames(): string[] {
    if (this.categories) {
      return Array.from(new Set(this.categories.map(category => category.name)));
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.selectedFilterCategory = 'all';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deleteCategory(id: number) {
    console.log('Deleting category with ID:', id);
    this.categoryService.deleteCategory(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.success) {
          
          this.categories = this.categories.filter(category => category.id !== id);
          this.snackBar.open('Category deleted successfully', 'OK', {
            duration: 2000,
          });
          this.cdr.detectChanges(); 
        } else {
          
          console.error('Delete operation failed:', response.message);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Category[]) => {
        console.log(response);
        this.categories = response;
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditModal(index: number) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '250px',
      data: this.categories[index],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
