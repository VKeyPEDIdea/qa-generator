import Question from 'entities/Question';
import { IQuestionListItem } from 'features/questionList/questionListStore';
import Button from 'shared/ui/Button';
import classes from './GeneratorPage.module.scss';

interface GeneratorPageProps {
    list: IQuestionListItem[];
    onQuestionTitleChange: (id: string, title: string) => void;
    onQuestionAnswerListChange: (id: string, answerList: string[]) => void;
    onQuestionAdd: () => void;
}

const GeneratorPage = ({
    list,
    onQuestionTitleChange,
    onQuestionAnswerListChange,
    onQuestionAdd
}: GeneratorPageProps) => {
    console.log(list.length);
    const onAddQuestionHandler = () => {
        onQuestionAdd();
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
            {questionList}
            <Button title='Добавить вопрос' onClick={onAddQuestionHandler} />
        </div>
    );
};

export default GeneratorPage;