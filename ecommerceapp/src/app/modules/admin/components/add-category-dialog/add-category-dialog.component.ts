
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
})
export class AddCategoryDialogComponent implements OnInit {
  name: string = '';
  imageUrl: string = '';
  imagesUrls: string[] = [];
  price: number = 0;
  unit: number = 0;
  is_active: number = 0;

  addImageUrl() {
    if (this.imageUrl && this.imageUrl.trim() !== '') {
      this.imagesUrls.push(this.imageUrl);
      this.imageUrl = '';
    }
  }

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private categoryService: CategoryService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddNewCategory() {
    const categoryData = {
      name: this.name,
      images: this.imagesUrls,
      price: this.price,
      unit: this.unit,
      is_active: this.is_active,
    };

    this.categoryService.addCategory(categoryData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.name = '';
        this.imagesUrls = [];
        this.price = 0;
        this.unit = 0;
        this.dialogRef.close();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
