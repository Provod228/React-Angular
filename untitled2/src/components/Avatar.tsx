type AvatarProps = {
    name: string;
    size?: number;
};

function Avatar({name, size = 48}: AvatarProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: '#6366f1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: size / 2,
                fontWeight: 'bold',
                userSelect: 'none',
            }}
        >
            {name[0].toUpperCase()}
        </div>
    );
}

export default Avatar;