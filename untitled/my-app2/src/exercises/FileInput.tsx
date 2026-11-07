import { useRef, useState } from 'react';

type FileInfo = {
    name: string;
    size: number;
};

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
}

// Упражнение 8: файловый инпут — классический неуправляемый элемент.
// Значение <input type="file"> нельзя задать из React (только очистить),
// поэтому работаем с ним через ref.
function FileInput() {
    const fileRef = useRef<HTMLInputElement>(null);

    // В state — только то, что нужно показать на экране
    const [file, setFile] = useState<FileInfo | null>(null);

    function handleChange() {
        const selected = fileRef.current?.files?.[0]; // FileList | null → File | undefined
        setFile(selected ? { name: selected.name, size: selected.size } : null);
    }

    function handleClear() {
        if (fileRef.current) fileRef.current.value = ''; // единственное, что можно «записать»
        setFile(null);
    }

    return (
        <section className="card">
            <h2>📎 Выбор файла</h2>

            {/* Нативный инпут прячем и открываем через ref — так его можно стилизовать */}
            <input ref={fileRef} type="file" hidden onChange={handleChange} />

            <div className="row">
                <button className="btn" type="button" onClick={() => fileRef.current?.click()}>
                    Выбрать файл
                </button>
                <button className="btn btn--ghost" type="button" onClick={handleClear} disabled={!file}>
                    Убрать
                </button>
            </div>

            {file ? (
                <p>
                    <strong>{file.name}</strong> <span className="muted">({formatSize(file.size)})</span>
                </p>
            ) : (
                <p className="muted">Файл не выбран</p>
            )}
        </section>
    );
}

export default FileInput;
