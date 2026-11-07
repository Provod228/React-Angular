import {useState} from "react";
import Styles from "./Styles.tsx";
import LoginForm from "./LoginForm.tsx";
import TodoListProduct from "./TodoListProduct.tsx";

function Work1_4() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    return (
        <>
            <button onClick={() => setCount(prev => prev + step)}>+{step}</button>
            <button onClick={() => setCount(prev => prev - step)}>-{step}</button>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                style={{display: 'flex', gap: 8, marginBottom: 16}}
            >
                <input
                    value={step}
                    type="number"
                    onChange={(e) => setStep(Number(e.target.value))}
                    placeholder="Что нужно сделать?"
                    style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd'}}
                />
            </form>
            Count is {count}
            <Styles/>
            <LoginForm/>
            <TodoListProduct />
        </>
    )
}


export default Work1_4;