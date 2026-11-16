import { Injectable } from '@angular/core';

// Экспортируем интерфейс, чтобы компоненты могли его импортировать
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root' // Сервис доступен во всём приложении как синглтон
})
export class TodoService {
  // Данные теперь живут здесь
  private todos: Todo[] = [
    { id: 1, text: 'Изучить Angular', done: false },
    { id: 2, text: 'Сделать проект', done: false },
  ];
  private nextId = 3;

  // Метод получения всех задач (возвращаем копию, чтобы не мутировали извне)
  getTodos(): Todo[] {
    return [...this.todos];
  }

  // Метод добавления
  addTodo(text: string): void {
    if (!text.trim()) return;
    this.todos.push({ id: this.nextId++, text: text.trim(), done: false });
  }

  // Метод удаления
  removeTodo(id: number): void {
    this.todos[id].done = true;
  }
}
