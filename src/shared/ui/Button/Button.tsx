import classes from './Button.module.css';

interface ButtonProps {
    title: string;
    onClick?: () => void;
}

const Button = ({
    title,
    onClick,
}: ButtonProps) => {
    return (
        <button className={classes.btn} onClick={onClick}>
            <span>{title}</span>
        </button>
    );
};

export default Button;