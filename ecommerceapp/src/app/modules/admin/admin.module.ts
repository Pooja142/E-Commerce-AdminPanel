
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SlickCarouselModule } from 'ngx-slick-carousel';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';



@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    AdminCategoryComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    SlickCarouselModule,

  ]
})
export class AdminModule { }
