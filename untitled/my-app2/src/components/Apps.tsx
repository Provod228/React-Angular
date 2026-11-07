import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

function Apps() {
    const [registered, setRegistered] = useState(null);

    function handleSuccess(data) {
        setRegistered(data);
    }

    return (
        <div style={{ maxWidth: 450, margin: '40px auto', padding: 20 }}>
            <h1>Регистрация</h1>

            {registered ? (
                <div style={{ padding: 16, background: '#dcfce7', borderRadius: 8 }}>
                    <p>✅ Спасибо, {registered.name}!</p>
                    <button onClick={() => setRegistered(null)}>
                        Зарегистрировать ещё
                    </button>
                </div>
            ) : (
                <RegistrationForm onSuccess={handleSuccess} />
            )}
        </div>
    );
}

export default Apps;