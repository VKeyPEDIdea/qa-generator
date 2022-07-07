interface ButtonProps {
    title: string;
    onClick: () => void;
}

const Button = ({
    title,
    onClick,
}: ButtonProps) => {
    return (
        <button onClick={onClick}>
            <span>{title}</span>
        </button>
    );
};

export default Button;