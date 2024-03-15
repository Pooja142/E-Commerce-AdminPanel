
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/category/category.service';

export interface EditCategoryData {
  id: number;
  name: string;
  images: string[];
  price: number;
  unit: number;
  is_active: number;
}

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent implements OnInit {
  name!: string;
  imagesUrls: string[] = [];
  price!: number;
  unit!: number;
  is_active!: number;

  imageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditCategoryData,
    private categoryService: CategoryService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addImageUrl() {
    if (this.imageUrl && this.imageUrl.trim() !== '') {
      this.imagesUrls.push(this.imageUrl);
      this.imageUrl = '';
    }
  }

  deleteImageUrl(index: number): void {
    if (index >= 0 && index < this.imagesUrls.length) {
      this.imagesUrls.splice(index, 1);
    }
  }

  EditNewCategory(): void {
    this.categoryService
      .updateCategory(this.data.id, {
        name: this.name,
        images: this.imagesUrls,
        price: this.price,
        unit: this.unit,
        is_active: this.is_active,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.name = '';
          this.imagesUrls = [];
          this.price = 0;
          this.unit = 0;
          this.is_active = 0;
          this.dialogRef.close();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.name = this.data.name;
    this.imagesUrls = this.data.images;
    this.price = this.data.price;
    this.unit = this.data.unit;
    this.is_active = this.data.is_active;
  }
}
