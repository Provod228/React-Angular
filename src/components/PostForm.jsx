import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultPostValues, postSchema } from '../schemas/postSchema';

function PostForm({ initialData, onSubmit, submitLabel = 'Сохранить' }) {
  const isEdit = Boolean(initialData);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: initialData ?? defaultPostValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

  async function handleFormSubmit(data) {
    try {
      await onSubmit({ ...data, tags: data.tags.map((tag) => tag.value) });
    } catch (err) {
      if (err.field) {
        setError(err.field, { type: 'server', message: err.message });
      } else {
        setError('root.serverError', { type: 'server', message: err.message });
      }
    }
  }

  const tagsArrayError = errors.tags?.root?.message ?? errors.tags?.message;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div>
        <label>Заголовок</label>
        <input {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label>Текст</label>
        <textarea rows={5} {...register('body')} />
        {errors.body && <p className="error">{errors.body.message}</p>}
      </div>

      <div>
        <label>ID автора</label>
        <input type="number" {...register('userId')} />
        {errors.userId && <p className="error">{errors.userId.message}</p>}
      </div>

      <div>
        <label>Теги ({fields.length}/5)</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="row">
              <input
                {...register(`tags.${index}.value`)}
                placeholder={`Тег ${index + 1}`}
              />
              <button type="button" onClick={() => remove(index)}>
                Удалить тег
              </button>
            </div>
            {errors.tags?.[index]?.value && (
              <p className="error">{errors.tags[index].value.message}</p>
            )}
          </div>
        ))}
        <div>
          <button type="button" onClick={() => append({ value: '' })}>
            Добавить тег
          </button>
        </div>
        {tagsArrayError && <p className="error">{tagsArrayError}</p>}
      </div>

      <div>
        <label>Статус</label>
        <select {...register('status')}>
          <option value="draft">Черновик</option>
          <option value="published">Опубликован</option>
        </select>
        {errors.status && <p className="error">{errors.status.message}</p>}
      </div>

      <div>
        <label>Дата публикации</label>
        <input type="date" {...register('publishDate')} />
        {errors.publishDate && (
          <p className="error">{errors.publishDate.message}</p>
        )}
      </div>

      {errors.root?.serverError && (
        <p className="error">{errors.root.serverError.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting || (!isDirty && isEdit)}
      >
        {isSubmitting ? 'Сохранение...' : submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
