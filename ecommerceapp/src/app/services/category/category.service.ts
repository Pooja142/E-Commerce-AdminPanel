
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Category {
  id: number;
  name: string;
  images: string[];
  price: number;
  unit: number;
  is_active: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data),  
    );
  }

  getCategoryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getCategoriesByName(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}?name=${name}`);
  }
  
  addCategory(category: any): Observable<any> {
    console.log('Adding Category:', category);
    return this.http.post<any>(this.apiUrl, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, category);
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
