import { Component, inject, OnInit } from '@angular/core';
import { PostService, Post } from '../post';
import {signal} from '@angular/core';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css'
})
export class PostsListComponent implements OnInit {
  private postService = inject(PostService);

  // Массив для хранения полученных постов
  posts = signal<Post[]> ([]);

  // Переменные для состояний загрузки и ошибки
  isLoading = signal(true);
  errorMessage = '';

  // ngOnInit — lifecycle hook, вызывается после создания компонента
  ngOnInit(): void {
    // Подписываемся на Observable, чтобы запрос выполнился
    this.postService.getPosts().subscribe({
      next: (data) => {
        // next вызывается, когда данные успешно пришли
        console.log('Полученные данные:', data);
        this.posts.set(data);
        console.log('Полученные данные:', data);
        this.isLoading.set(false);
        console.log('Полученные данные:', this.isLoading);
      },
      error: (err) => {
        // error вызывается при проблемах с сетью или сервером
        this.errorMessage = 'Не удалось загрузить посты. Проверьте соединение.';
        this.isLoading.set(false);
        console.error('Ошибка загрузки:', err);
      }
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts.update(list => list.filter(p => p.id !== id));
      }
    })
  }

}
