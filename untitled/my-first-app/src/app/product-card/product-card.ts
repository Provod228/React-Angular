import { Component } from '@angular/core';

// Интерфейс описывает, какие данные мы ожидаем в товаре.
// Это помогает избежать опечаток (например, если напишем "prise" вместо "price").
interface Product {
  name: string;
  price: number;
  description?: string; // Знак "?" означает, что поле необязательное
}

@Component({
  selector: 'app-product-card', // Тег, который мы будем использовать в HTML
  standalone: true,             // Современный стандарт: не нужен NgModule
  imports: [],                  // Сюда импортируются другие компоненты/директивы (пока пусто)
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  // Создаем объект товара, который соответствует интерфейсу Product
  product: Product = {
    name: 'Ноутбук',
    price: 75000,
    description: 'Мощный и легкий'
  };

  // Метод для демонстрации (пока просто возвращает строку)
  getProductInfo(): string {
    return `${this.product.name} стоит ${this.product.price} руб.`;
  }
}
