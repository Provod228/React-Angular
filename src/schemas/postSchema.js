import { z } from 'zod';


export function todayString() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов'),
  body: z
    .string()
    .min(10, 'Минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),
  userId: z.coerce
    .number()
    .int('Только целое число')
    .positive('Должно быть больше 0'),
  tags: z
    .array(
      z.object({
        value: z
          .string()
          .min(2, 'Тег: минимум 2 символа')
          .max(20, 'Тег: максимум 20 символов'),
      })
    )
    .min(1, 'Добавьте хотя бы один тег')
    .max(5, 'Максимум 5 тегов'),
  status: z.enum(['draft', 'published'], 'Выберите статус'),
  publishDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат даты: YYYY-MM-DD')
    .refine((value) => {
      // 'T00:00:00' — чтобы дата парсилась в локальном времени, а не в UTC
      const date = new Date(`${value}T00:00:00`);
      const startOfToday = new Date().setHours(0, 0, 0, 0);
      return date.getTime() >= startOfToday; // «сегодня» — валидно
    }, 'Дата не может быть в прошлом'),
});


export const defaultPostValues = {
  title: '',
  body: '',
  userId: 1,
  tags: [{ value: '' }],
  status: 'draft',
  publishDate: todayString(),
};

export function postToFormValues(post) {
  return {
    title: post.title,
    body: post.body,
    userId: post.userId,
    tags: (post.tags ?? ['jsonplaceholder']).map((value) => ({ value })),
    status: post.status ?? 'published',
    publishDate: post.publishDate ?? todayString(),
  };
}


