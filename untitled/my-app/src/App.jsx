import Footer from './components/Footer.jsx';
import StudentCard from "./components/StudentCard.jsx";
import StatCard from "./components/StatCard.jsx";
import {students} from "./data/students.js";
import StudentList from "./components/StudentList.jsx";


const totalStudents = students.length;
const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
const youngestAge = Math.min(...students.map((s) => s.age));
const uniqueCities = new Set(students.map((s) => s.city)).size;

function App() {
    return (
        <>
            <StudentCard student={{name: "dasdsa", age: 123, course: 4, city: "dqweqwe", gpa: 4.5, skills: ["Sdasd", "dasdsad"]}}/>
            <StatCard
                label="Всего студентов"
                value={totalStudents}
                color="#e0f2fe"
                icon="👥"
            />
            <StatCard
                label="Средний балл"
                value={avgGpa.toFixed(2)}  // .toFixed(2) → "4.43"
                color="#dcfce7"
                icon="📊"
            />
            <StatCard
                label="Младший возраст"
                value={`${youngestAge} лет`}  // шаблонная строка
                color="#fef3c7"
                icon="📊"
            />
            <StatCard
                label="Городов"
                value={uniqueCities}
                color="#fce7f3"
                icon="🌆"
            />
            <StudentList students={students} sortBy={"age"}/>
            <Footer/>
        </>
    );
}

// Экспорт по умолчанию — чтобы main.jsx мог импортировать
export default App;