import Question from 'entities/Question';
import { IQuestionListItem } from 'features/questionList/questionListStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'shared/ui/Button';
import Table from 'shared/ui/Table';
import classes from './GeneratorPage.module.scss';

interface GeneratorPageProps {
    list: IQuestionListItem[];
    onQuestionTitleChange: (id: string, title: string) => void;
    onQuestionAnswerListChange: (id: string, answerList: string[]) => void;
    onQuestionAdd: () => void;
    generateTable: (responseAmount: number) => Array<string[]>;
    getQuestionList: (projectName: string) => void;
}

const GeneratorPage = ({
    list,
    onQuestionTitleChange,
    onQuestionAnswerListChange,
    onQuestionAdd,
    generateTable,
    getQuestionList,
}: GeneratorPageProps) => {
    const [table, setTable] = useState<JSX.Element | null>(null);
    const [count, setCount] = useState(0);
    let projectName: string = '';
    
    useEffect(() => {
        projectName = window.location.pathname.split('/')[2];
        getQuestionList(projectName);
    }, []);

    const onAddQuestionHandler = () => {
        onQuestionAdd();
    };

    const onGenerateTableHandler = () => {
        const content = [...generateTable(count)];
        
        setTable(<Table content={content}/>);
    };

    const questionList = list.map(question => {
        return (
            <Question key={question.id}
                {...question}
                onTitleChange={onQuestionTitleChange}
                onAnswerListChange={onQuestionAnswerListChange}
            />
        );
    });

    return (
        <div className={classes.container}>
            <Link to='/'>
                <Button title='Назад в список'/>
            </Link>
            <h1>{projectName}</h1>
            {questionList}
            <Button title='Добавить вопрос' onClick={onAddQuestionHandler} />
            <Button title='Сгенерировать таблицу' onClick={onGenerateTableHandler} />
            <input type='text' placeholder='Введите количество ответов' onChange={e => setCount(+e.target.value)}/>
            {table}
        </div>
    );
};

export default GeneratorPage;