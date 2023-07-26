import Button from 'shared/ui/Button/Button';
import classes from './AnswerListItem.module.scss';

interface AnswerListItemProps {
    content: string;
    percentage: number;
    onDelete: () => void;
    onPercentageChange: () => void;
}

const AnswerListItem = ({
    content,
    percentage,
    onDelete,
    onPercentageChange
}: AnswerListItemProps) => {
    return (
        <div className={classes.answer}>
            <div>{content}</div>
            <div className={classes.actions}>
                <input type='number'
                    min={1}
                    max={100}
                    onChange={onPercentageChange}
                    value={percentage}/>
                <Button title='Удалить' onClick={onDelete}/>
            </div>
        </div>
    )
};

export default AnswerListItem;
