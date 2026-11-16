import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Импортируем директивы

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Добавляем в imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'my-app';
}
