
type FilterOption = {
    key: string;
    label: string;
    count: number;
};

type FiltersProps = {
    options: FilterOption[];
    current: string;
    onChange: (key: string) => void;
};

function Filters({ options, current, onChange }: FiltersProps) {
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {options.map((option) => {
                const isActive = option.key === current;
                return (
                    <button
                        key={option.key}
                        onClick={() => onChange(option.key)}
                        style={{
                            padding: '8px 14px',
                            border: '1px solid #ddd',
                            borderRadius: 8,
                            background: isActive ? '#3b82f6' : 'white',
                            color: isActive ? 'white' : '#374151',
                            cursor: 'pointer',
                        }}
                    >
                        {option.label} ({option.count})
                    </button>
                );
            })}
        </div>
    );
}

export default Filters;