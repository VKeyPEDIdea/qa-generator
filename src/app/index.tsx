import { AppStore } from 'features/store';
import { observer } from 'mobx-react-lite';
import GeneratorPage from 'pages/GeneratorPage';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import { Route, Routes } from 'react-router';
import './index.scss';

interface AppProps extends AppStore {};
const GENERATOR_PAGE_PATH = '/generator/:projectName';

const App = observer(({
    store: {
        questions: {
            questionList,
            setQuestionTitleById,
            setAnswerListById,
            addQuestion,
            generateAnswersForTable,
            getQuestionList,
        },
        projectList: {
            projectListKeys
        }
    }
}: AppProps) => {
    const onProjectItemClick = (projectName: string) => {
        getQuestionList(projectName);
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProjectListPage list={projectListKeys} />} />
                <Route path={GENERATOR_PAGE_PATH} element={<GeneratorPage
                        list={questionList}
                        onQuestionTitleChange={setQuestionTitleById}
                        onQuestionAnswerListChange={setAnswerListById}
                        onQuestionAdd={addQuestion}
                        generateTable={generateAnswersForTable}
                        getQuestionList={onProjectItemClick}
                    />}/>
            </Routes>
        </div>
    );
});

export default App;
