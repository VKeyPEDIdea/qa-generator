import Button from 'shared/ui/Button/Button';
import classes from './AnswerListItem.module.scss';

interface AnswerListItemProps {
    content: string;
}

const AnswerListItem = ({
    content
}: AnswerListItemProps) => {
    return (
        <div className={classes.answer}>
            <div>{content}</div>
            <div className={classes.actions}>
                <input type='text'/>
                <Button title='Удалить'/>
            </div>
        </div>
    )
};

export default AnswerListItem;
