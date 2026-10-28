import { z } from 'zod';

// Часть 11: схема формы создания пользователя
export const userSchema = z
  .object({
    name: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Некорректный email'),
    // input type="number" всё равно отдаёт строку → coerce превращает её в число
    age: z.coerce.number().int('Только целое число').min(18, 'Только с 18 лет'),
    role: z.enum(['admin', 'editor', 'viewer']),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    bio: z.string().max(500, 'Максимум 500 символов').optional(),
  })
  // кросс-полевая проверка: видит сразу все поля объекта
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'], // ошибка привяжется к этому полю
  });
