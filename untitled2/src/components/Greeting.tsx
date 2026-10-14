type GreetingProps = {
    name?: string;
    greeting?: string;
};

function Greeting({ name = 'гость', greeting = 'Привет' }: GreetingProps) {
    return (
        <p>
            {greeting}, {name}!
        </p>
    );
}

export default Greeting;