import Badge from './Badge.jsx'
import SkillsList from "./SkillsList.jsx";

function StudentCard({student}) {
    // Деструктурируем пропс student — получаем объект студента.
    // Внутри сразу деструктурируем поля этого объекта.
    const {name, age, course, city, gpa, skills} = student;

    // Функция для отображения «звёздочек» по GPA.
    // Возвращает строку из ⭐ и ☆.
    // Это обычная JS-логика — её удобно вынести ДО return.
    function renderStars(rating) {
        const fullStars = Math.round(rating);      // округляем 4.8 → 5
        const emptyStars = 5 - fullStars;          // сколько пустых
        return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }

    // Цвет бейджа курса — тернарник для выбора
    const courseColor = course >= 3 ? '#28a745' : '#ffc107';

    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '20px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
        >
            {/* Шапка карточки: имя и курс */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 12,
                }}
            >
                <img
                    src={`https://ui-avatars.com/api/?name=${name}`}
                    style={{width: 48, height: 48, borderRadius: '50%'}}
                />

                <h3 style={{margin: 0, fontSize: '18px'}}>{name}</h3>

                {/* Бейдж с курсом. Цвет берём из переменной выше */}
                <Badge text={`${course} курс`} color={courseColor}/>
            </div>


            {/* Основная информация. Каждая строка — отдельный <p> */}
            <p style={{margin: '6px 0', color: '#555'}}>
                <strong>Возраст:</strong> {age} лет
            </p>
            <p style={{margin: '6px 0', color: '#555'}}>
                <strong>Город:</strong> {city}
            </p>

            {/* GPA со звёздочками */}
            <p style={{margin: '6px 0', color: '#555'}}>
                <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
                {gpa >= 4.5 && <Badge text="🏆 Отличник" color="#f59e0b"/>}
            </p>

            <SkillsList skills={skills} />
        </div>
    );
}

export default StudentCard;