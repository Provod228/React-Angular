import { Component, signal } from '@angular/core';
import {TodoList} from './todo-list/todo-list';
import {CLickCounter} from './click-counter/click-counter';
import {ShoppingList} from './shopping-list/shopping-list';


@Component({
  selector: 'app-root',
  imports: [
    ShoppingList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('');
}
