import {Component, inject, signal} from '@angular/core';
import {
  FormBuilder,        // Сервис для удобного создания форм
  FormGroup,          // Группа контролов (сама форма)
  ReactiveFormsModule, // Модуль, необходимый для работы с реактивными формами
  Validators          // Встроенные валидаторы (required, minLength и т.д.)
} from '@angular/forms';
import {Post, PostService} from '../post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Обязательно импортируем для standalone-компонента
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostFormComponent {
  // Внедряем FormBuilder для декларативного создания формы
  private fb = inject(FormBuilder);

  private postService = inject(PostService);


  // Переменные для состояний загрузки и ошибки
  isLoading = signal(true);

  // Создаём модель формы. Каждый контрол — это поле ввода.
  // Первое значение в массиве — начальное (пустая строка).
  // Второе — массив валидаторов.
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(10)]]
  });

  // Геттер для удобного доступа к контролам в шаблоне (для отображения ошибок)
  get title() { return this.postForm.get('title'); }
  get body() { return this.postForm.get('body'); }

  // Метод, вызываемый при отправке формы
  onSubmit() {
    // Проверяем, валидна ли форма, прежде чем что-то делать
    if (this.postForm.valid) {
      // В реальном приложении здесь был бы вызов сервиса для отправки на сервер
      console.log('Отправленные данные:', this.postForm.value);
      this.postService.addPost(this.postForm.value).subscribe({
        next: (data) => {
          console.log('Полученные данные:', data);
          this.isLoading.set(false);
          console.log('Полученные данные:', this.isLoading);
        }
      })

      // Сброс формы после "отправки"
      this.postForm.reset();
    } else {
      // Если форма невалидна, помечаем все поля как "тронутые",
      // чтобы пользователь увидел сообщения об ошибках
      this.postForm.markAllAsTouched();
    }
  }
}
