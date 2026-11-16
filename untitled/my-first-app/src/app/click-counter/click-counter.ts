import {Component} from '@angular/core';

// Интерфейс описывает, какие данные мы ожидаем в товаре.
// Это помогает избежать опечаток (например, если напишем "prise" вместо "price").

@Component({
  selector: 'app-click-counter', // Тег, который мы будем использовать в HTML
  standalone: true,             // Современный стандарт: не нужен NgModule
  imports: [],                  // Сюда импортируются другие компоненты/директивы (пока пусто)
  templateUrl: './click-counter.html',
  styleUrl: './click-counter.css'
})
export class CLickCounter {
  // Создаем объект товара, который соответствует интерфейсу Product
  count: number = 0;

  // Метод для демонстрации (пока просто возвращает строку)
  addCount(): void {
    this.count++;
  }

  reduceCount(): void {
    this.count--;
  }
}
