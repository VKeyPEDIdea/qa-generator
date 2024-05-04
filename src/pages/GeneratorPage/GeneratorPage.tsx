import Question from 'entities/Question';
import { Answer, IQuestionListItem } from 'features/questionList/questionListStore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'shared/ui/Button';
import Table from 'shared/ui/Table';
import InputNumber from 'shared/ui/InputNumber';
import useQuestionList from './hooks/useQuestionList';
import { ActionBar, ActionBarItem, Container, TopNavigation } from './styled';

interface GeneratorPageProps {
    questions: IQuestionListItem[];
    answers: Answer[];
    onQuestionTitleChange: (id: string, title: string) => void;
    onQuestionAnswerListChange: (id: number, answerList: Omit<Answer, 'id'>[]) => void;
    onQuestionAdd: () => void;
    generateTable: (responseAmount: number) => Array<Answer[]>;
    getQuestionList: (projectName: string) => void;
    onDeleteAnswer: (id: number) => void;
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
    
    useQuestionList(getQuestionList);
    const onAddQuestionHandler = () => {
        onQuestionAdd();
    };

    const onGenerateTableHandler = () => {
        const content = [...generateTable(count)];
        setTable(<Table content={content}/>);
    };

    const questionList = questions.map((question, index) => {
        return (
            <Question key={question.id + question.title}
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
        <Container>
            <TopNavigation>
                <Link to='/'>
                    <Button title='Назад в список'/>
                </Link>
            </TopNavigation>
            {questionList}
            <ActionBar>
                <ActionBarItem>
                    <Button title='Добавить вопрос' onClick={onAddQuestionHandler} />
                </ActionBarItem>
                <ActionBarItem>
                    <Button title='Сгенерировать таблицу' onClick={onGenerateTableHandler} />
                </ActionBarItem>
                <ActionBarItem>
                    <InputNumber value={count}
                        onChange={e => setCount(+e.target.value)}
                    />
                </ActionBarItem>
            </ActionBar>
            {table}
        </Container>
    );
};

export default GeneratorPage;
