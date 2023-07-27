import Button from 'shared/ui/Button';
import classes from './AnswerListItem.module.scss';
import InputNumber from 'shared/ui/InputNumber';

interface AnswerListItemProps {
    content: string;
    percentage: number;
    onDelete: () => void;
    onPercentageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
                <InputNumber value={percentage}
                    onChange={onPercentageChange}
                    min={0}
                    max={100}
                />
                <Button title='Удалить' onClick={onDelete}/>
            </div>
        </div>
    )
};

export default AnswerListItem;
