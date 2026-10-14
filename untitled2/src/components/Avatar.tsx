// components/Avatar.tsx
type AvatarProps = {
    name: string;
    size?: number;
};

function Avatar({ name, size = 48 }: AvatarProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',              // круг
                background: '#6366f1',            // цвет на твой вкус
                color: 'white',
                display: 'flex',                  // центрирование буквы
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: size / 2,               // размер буквы зависит от размера круга
                fontWeight: 'bold',
                userSelect: 'none',
            }}
        >
            {name[0].toUpperCase()}
        </div>
    );
}

export default Avatar;