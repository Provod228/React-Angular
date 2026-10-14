import './App.css'
import Greeting from "./components/Greeting.tsx";
import Product from "./components/Product.tsx";
import Avatar from "./components/Avatar.tsx";
import Card from "./components/Card.tsx";
import Button from "./components/Button.tsx";

function App() {
    return (
        <>
            <section>
                <h2>Задание 1</h2>
                <Greeting name={"Честер"}/>
                <Greeting name={"Егор"} greeting={"Пока"}/>
                <Greeting/>
            </section>

            <section>
                <h2>Задача 2</h2>
                <Product title={"Комп"} price={100000} discount={20}/>
                <Product title={"Комп"} price={200000} discount={95}/>
                <Product title={"Комп"} price={10000000}/>
            </section>

            <section>
                <h2>Задание 3</h2>
                <Avatar name={"Grisha"} size={32}/>
                <Avatar name={"Provod"} size={48}/>
                <Avatar name={"Govord"} size={80}/>
            </section>

            <section>
                <h2>Задание 4</h2>
                <Card title={"Название"}>
                    <p>Не придумал вообще</p>
                </Card>

                <Card title="Список дел">
                    <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
                        <li>Разобраться с JSX</li>
                        <li>Понять пропсы и children</li>
                        <li>Сделать домашку</li>
                    </ul>
                </Card>
            </section>

            <section>
                <h2>Задача 5</h2>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger" onClick={() => alert('Удалено!')}>
                    Удалить
                </Button>
                <Button variant="primary" disabled>
                    Disabled
                </Button>
            </section>
        </>
    )
}

export default App
