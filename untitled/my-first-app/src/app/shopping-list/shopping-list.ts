import { Component, inject } from '@angular/core';
import { TodoService, Todo } from './todo'; // Импорт сервиса и интерфейса


@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [], // Пока ничего не импортируем
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css'
})
export class ShoppingList {
  // Массив задач (в реальном приложении придет с сервера)
  private todoService = inject(TodoService);

  // Геттер для получения списка задач из сервиса
  // При каждом обращении в шаблоне будет вызываться getTodos()
  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  addTodo(input: HTMLInputElement) {
    this.todoService.addTodo(input.value);
    input.value = ''; // Очистка поля
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }
}
