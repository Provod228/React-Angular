import StudentCard from './StudentCard';

// StudentList принимает массив студентов и рендерит их карточки.
// Используем метод .map() — он превращает массив данных в массив компонентов.

function StudentList({ students, sortBy = 'name' }) {
    // Обработка пустого массива — важная практика UX
    if (students.length === 0) {
        return (
            <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                Студентов пока нет 😔
            </p>
        );
    }

    const sortedStudents = [...students].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        if (sortBy === 'age') {
            return a.age - b.age;
        }
        if (sortBy === 'gpa') {
            return a.gpa - b.gpa;
        }
        return 0;
    })

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px',
            }}
        >
            {sortedStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </div>
    );
}

export default StudentList;