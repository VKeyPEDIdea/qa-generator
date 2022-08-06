import { AppStore } from 'features/store';
import { observer } from 'mobx-react-lite';
import GeneratorPage from 'pages/GeneratorPage';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import { useEffect } from 'react';
import './index.scss';

interface AppProps extends AppStore {};
const GENERATOR_PAGE_PATH = 'qa-generator/build/generator';

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
    const { pathname } = window.location;
    let page = null;

    const onProjectItemClick = (projectName: string) => {
        getQuestionList(projectName);
    };

    if (pathname === '/qa-generator/build/') {
        page = <ProjectListPage list={projectListKeys}/>;
    } else if (pathname.includes(GENERATOR_PAGE_PATH)) {
        page = <GeneratorPage
            list={questionList}
            onQuestionTitleChange={setQuestionTitleById}
            onQuestionAnswerListChange={setAnswerListById}
            onQuestionAdd={addQuestion}
            generateTable={generateAnswersForTable}
            getQuestionList={onProjectItemClick}
        />;
    }

    return (
        <div className="App">
            {page}
        </div>
    );
});

export default App;
