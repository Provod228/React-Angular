import type {ReactNode} from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
    children: ReactNode;
    variant?: Variant;
    onClick?: () => void;
    disabled?: boolean;
};


const colors: Record<Variant, string> = {
    primary: '#3b82f6',
    secondary: '#6b7280',
    danger: '#ef4444',
};

function Button({
                    children,
                    variant = 'primary',
                    onClick,
                    disabled = false,
                }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: colors[variant],
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                margin: 4,
            }}
        >
            {children}
        </button>
    );
}

export default Button;