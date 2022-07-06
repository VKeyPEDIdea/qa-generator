import classes from './Card.module.scss';

interface CardProps {
    children: React.ReactNode;
}

const Card = ({
    children
}: CardProps) => {
    return (
        <div className={classes.card}>{children}</div>
    );
};

export default Card;
