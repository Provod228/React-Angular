import { PostsListComponent } from './posts-list/posts-list';
import {Home} from './home/home';
import {About} from './about/about';
import {Routes} from '@angular/router';
import {Contacts} from './contacts/contacts';
import {PostFormComponent} from './post-form/post-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Главная' },
  { path: 'about', component: About, title: 'О нас' },
  { path: 'contacts', component: Contacts, title: 'О нас' },
  { path: 'posts', component: PostsListComponent, title: 'Посты' }, // Новый маршрут
  { path: 'create', component: PostFormComponent, title: 'Форма поста' },
  { path: '**', redirectTo: '' }
];
