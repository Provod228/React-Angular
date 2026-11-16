import { Component } from '@angular/core';

// Интерфейс для одной задачи
interface Todo {
  id: number;
  text: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [], // Пока ничего не импортируем
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  // Массив задач (в реальном приложении придет с сервера)
  todos: Todo[] = [
    { id: 1, text: 'Изучить Angular' },
    { id: 2, text: 'Сделать проект' }
  ];

  // Счетчик для уникальных ID новых задач
  private nextId = 3;

  // Метод для добавления задачи из input
  addTodo(input: HTMLInputElement) {
    const text = input.value.trim();
    if (!text) return; // Игнорируем пустой ввод

    // Добавляем новый объект в массив
    this.todos.push({ id: this.nextId++, text: text });

    // Очищаем поле ввода после добавления
    input.value = '';
  }

  // Метод удаления задачи по ID
  removeTodo(id: number) {
    // Фильтруем массив, оставляя все задачи кроме той, что нужно удалить
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
