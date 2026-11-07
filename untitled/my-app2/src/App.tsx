import { useState } from 'react';
import './App.css';
import CatFacts from './exercises/CatFacts.tsx';
import Weather from './exercises/Weather.tsx';
import Pagination from './exercises/Pagination.tsx';
import DebouncedSearch from './exercises/DebouncedSearch.tsx';
import ReviewForm from './exercises/ReviewForm.tsx';
import CountryCityForm from './exercises/CountryCityForm.tsx';
import FocusForm from './exercises/FocusForm.tsx';
import FileInput from './exercises/FileInput.tsx';
import IdleForm from './exercises/IdleForm.tsx';
import MultiStepForm from './exercises/multistep/MultiStepForm.tsx';

type Exercise = {
    title: string;
    Component: () => React.ReactElement;
};

// Упражнения Частей 5–6. Компонент вкладки монтируется только когда она открыта,
// поэтому при переключении срабатывают cleanup-функции (отмена запросов, таймеров).
const EXERCISES: Exercise[] = [
    { title: 'Кошки', Component: CatFacts },
    { title: 'Погода', Component: Weather },
    { title: 'Пагинация', Component: Pagination },
    { title: 'Поиск', Component: DebouncedSearch },
    { title: 'Отзыв', Component: ReviewForm },
    { title: 'Страна/город', Component: CountryCityForm },
    { title: 'Фокус', Component: FocusForm },
    { title: 'Файл', Component: FileInput },
    { title: 'Неактивность', Component: IdleForm },
    { title: 'Шаги', Component: MultiStepForm },
];

function App() {
    const [active, setActive] = useState(0);
    const { Component } = EXERCISES[active];

    return (
        <div className="app">
            <h1>Части 5–6</h1>

            <nav className="tabs">
                {EXERCISES.map((exercise, i) => (
                    <button
                        key={exercise.title}
                        className={i === active ? 'tab tab--active' : 'tab'}
                        onClick={() => setActive(i)}
                    >
                        {i + 1}. {exercise.title}
                    </button>
                ))}
            </nav>

            <Component />
        </div>
    );
}

export default App;
