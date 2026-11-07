type FieldProps = {
    label: string;
    htmlFor?: string;
    error?: string;          // текст ошибки; показываем, только если передан
    children: React.ReactNode;
};

// Обёртка поля формы: подпись + само поле + ошибка под ним
function Field({ label, htmlFor, error, children }: FieldProps) {
    return (
        <div className="field">
            <label className="field__label" htmlFor={htmlFor}>{label}</label>
            {children}
            {error && <p className="error error--small">{error}</p>}
        </div>
    );
}

export default Field;
