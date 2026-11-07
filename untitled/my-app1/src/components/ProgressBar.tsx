type ProgressBarProps = {
    done: number;
    total: number;
};

// Задание 8: прогресс-бар done/total в процентах
function ProgressBar({ done, total }: ProgressBarProps) {
    // При 0 задач делить нельзя (0 / 0 = NaN), поэтому показываем 0%
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#999', marginBottom: 4 }}>
                <span>Выполнено: {done} из {total}</span>
                <span>{percent}%</span>
            </div>

            {/* Внешняя полоса — фон, внутренняя — заполнение */}
            <div style={{ height: 10, background: '#374151', borderRadius: 5, overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: percent === 100 ? '#10b981' : '#3b82f6',
                        transition: 'width 0.3s',
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
