import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Интерфейс описывает структуру данных, которые мы ожидаем от API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Внедряем HttpClient через inject()
  private http = inject(HttpClient);

  // Базовый URL API
  private apiUrl = 'http://localhost:3000/posts';

  // Метод возвращает Observable, а не сами данные.
  // Запрос выполнится только когда кто-то подпишется на этот Observable.
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(post: { title: string; body: string }): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/posts', post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
