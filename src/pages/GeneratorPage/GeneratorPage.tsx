import Question from 'entities/Question';
import { Answer, IQuestionListItem } from 'features/questionList/questionListStore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'shared/ui/Button';
import Table from 'shared/ui/Table';
import classes from './GeneratorPage.module.scss';
import InputNumber from 'shared/ui/InputNumber';

const containerClass = classes.container;
const topNavClass = classes['top-nav'];
const actionBarClass = classes['action-bar__item'];

interface GeneratorPageProps {
    questions: IQuestionListItem[];
    answers: Answer[];
    onQuestionTitleChange: (id: string, title: string) => void;
    onQuestionAnswerListChange: (id: string, answerList: Answer[]) => void;
    onQuestionAdd: () => void;
    generateTable: (responseAmount: number) => Array<Answer[]>;
    getQuestionList: (projectName: string) => void;
    onDeleteAnswer: (id: string, answerText: string) => void;
    onPercentageChange(id: string, answerText: string, percentage: number): void;
    onDeleteQuestion(id: string): void;
}

const GeneratorPage = ({
    questions,
    answers,
    onQuestionTitleChange,
    onQuestionAnswerListChange,
    onQuestionAdd,
    generateTable,
    getQuestionList,
    onDeleteAnswer,
    onPercentageChange,
    onDeleteQuestion,
}: GeneratorPageProps) => {
    const [table, setTable] = useState<JSX.Element | null>(null);
    const [count, setCount] = useState(0);
    const { projectName } = useParams();
    
    useEffect(() => {
        getQuestionList(projectName || '');
    }, [projectName]);

    const onAddQuestionHandler = () => {
        onQuestionAdd();
    };

    const onGenerateTableHandler = () => {
        const content = [...generateTable(count)];
        setTable(<Table content={content}/>);
    };

    const questionList = questions.map((question, index) => {
        return (
            <Question key={question.id}
                {...question}
                serialNumber={index + 1}
                answerList={answers.filter(({ questionId }) => questionId === question.id)}
                onTitleChange={onQuestionTitleChange}
                onAnswerListChange={onQuestionAnswerListChange}
                onDeleteAnswer={onDeleteAnswer}
                onPercentageChange={onPercentageChange}
                onDeleteQuestion={onDeleteQuestion}
            />
        );
    });

    return (
        <div className={containerClass}>
            <div className={topNavClass}>
                <Link to='/'>
                    <Button title='Назад в список'/>
                </Link>
            </div>
            {questionList}
            <div className={classes['action-bar']}>
                <div className={actionBarClass}>
                    <Button title='Добавить вопрос' onClick={onAddQuestionHandler} />
                </div>
                <div className={actionBarClass}>
                    <Button title='Сгенерировать таблицу' onClick={onGenerateTableHandler} />
                </div>
                <div className={actionBarClass}>
                    <InputNumber value={count}
                        onChange={e => setCount(+e.target.value)}
                    />
                </div>
            </div>
            {table}
        </div>
    );
};

export default GeneratorPage;