import { useState } from 'react';
import Card from 'shared/ui/Card';
import classes from './Question.module.scss';
import { Answer } from 'features/questionList/questionListStore';
import Button from 'shared/ui/Button/Button';
import AnswerListItem from 'entities/AnswerListItem';

interface QuestionProps {
    id: string;
    title: string;
    answerList: Answer[];
    onTitleChange: (id: string, title: string) => void;
    onAnswerListChange: (id: string, answerList: Answer[]) => void;
}

const Question = ({
    id,
    title,
    answerList,
    onTitleChange,
    onAnswerListChange,
}: QuestionProps) => {
    const [answers, setAnswers] = useState<Answer[]>([])
    const [height, setHeight] = useState('auto');
    const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(id, e.target.value);
    };

    const onChangeAnswersVariant = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const targetText = event.currentTarget.value;
        const arr = targetText.split('\n');
        const answers: Answer[] = arr.map(res => ({
            text: res,
            amount: 0,
            count: 0,
            percentage: +res.split('%%')[1],
        }));
        const newHeight = event.currentTarget.scrollHeight + 'px';
        if (newHeight !== height) setHeight(newHeight);

        setAnswers(answers);
    };
    
    const onAddNewAnswers = () => {
        onAnswerListChange(id, answers);
        setAnswers([]);
        setHeight('auto');
    }

    return (
        <div className={classes.question}>
            <Card>
                <p className={classes.label}>{id} Вопрос</p>
                <div className={classes.input}>
                    <input type='text'
                        placeholder='Введите вопрос'
                        className={classes.field}
                        value={title}
                        onChange={onQuestionChange}
                    />
                </div>
                <p className={classes.label}>Варианты ответов</p>
                <div className={classes.area}>
                    <textarea
                        style={ { height } }
                        onChange={onChangeAnswersVariant}
                        className={classes.field}
                        value={answers.map(({ text }) => text).join('\n')}
                        placeholder='Ваши ответы' />
                </div>
                <div className={classes['action-bar']}>
                    <Button title='Добавить ответы' onClick={onAddNewAnswers}/>
                </div>
                {answerList.map(({ text }) => <AnswerListItem content={text}/>)}
            </Card>
        </div>
    );
};

export default Question;