import Question from 'entities/Question';
import { IQuestionListItem } from 'features/questionList/questionListStore';
import classes from './GeneratorPage.module.scss';

interface GeneratorPageProps {
    list: IQuestionListItem[];
    onQuestionTitleChange: (id: string, title: string) => void;
    onQuestionAnswerListChange: (id: string, answerList: string[]) => void;
}

const GeneratorPage = ({
    list,
    onQuestionTitleChange,
    onQuestionAnswerListChange,
}: GeneratorPageProps) => {
    return (
        <div className={classes.container}>
            {list.map(question => {
                return (
                    <Question key={question.id}
                        {...question}
                        onTitleChange={onQuestionTitleChange}
                        onAnswerListChange={onQuestionAnswerListChange}
                    />
                );
            })}
        </div>
    );
};

export default GeneratorPage;