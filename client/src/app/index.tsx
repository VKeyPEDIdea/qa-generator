import { AppStore } from 'features/store';
import { observer } from 'mobx-react-lite';
import GeneratorPage from 'pages/GeneratorPage';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import { Route, Routes } from 'react-router';
import './index.css';

export interface AppProps extends AppStore {};
const GENERATOR_PAGE_PATH = '/generator/:projectName';

const App = observer(({
    store: {
        questions: {
            questionList,
            answerList,
            setQuestionTitleById,
            addAnswersByQuestionId,
            addQuestion,
            generateAnswersForTable,
            getQuestionList,
            deleteAnswer,
            changeAnswerPercentage,
            deleteQuestion
        },
        projectList: {
            projectListKeys,
            loadProjectList,
        }
    }
}: AppProps) => {
    const onProjectItemClick = (projectName: string) => {
        getQuestionList(projectName);
    };
    
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProjectListPage list={projectListKeys} loadList={loadProjectList}/>} />
                <Route path={GENERATOR_PAGE_PATH} element={<GeneratorPage
                        questions={questionList}
                        answers={answerList}
                        onQuestionTitleChange={setQuestionTitleById}
                        onQuestionAnswerListChange={addAnswersByQuestionId}
                        onQuestionAdd={addQuestion}
                        generateTable={generateAnswersForTable}
                        getQuestionList={onProjectItemClick}
                        onDeleteAnswer={deleteAnswer}
                        onPercentageChange={changeAnswerPercentage}
                        onDeleteQuestion={deleteQuestion}
                    />}/>
            </Routes>
        </div>
    );
});

export default App;
