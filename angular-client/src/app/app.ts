import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

interface Product {
  id: number;
  name: string;
  institution?: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly http = inject(HttpClient);
  protected products: Product[] = [];
  protected loading = true;
  protected error = '';

  constructor() {
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo consultar la API';
        this.loading = false;
      },
    });
  }
}
