import type { ReactNode } from 'react';

type CardProps = {
    title: string;
    children: ReactNode;
};

function Card({ title, children }: CardProps) {
    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
        >
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            <div>{children}</div>
        </div>
    );
}

export default Card;