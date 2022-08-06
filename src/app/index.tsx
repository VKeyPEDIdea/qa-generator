import { AppStore } from 'features/store';
import { observer } from 'mobx-react-lite';
import GeneratorPage from 'pages/GeneratorPage';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import './index.scss';

interface AppProps extends AppStore {};
const GENERATOR_PAGE_PATH = 'generator';

const App = observer(({
    store: {
        questions: {
            questionList,
            setQuestionTitleById,
            setAnswerListById,
            addQuestion,
            generateAnswersForTable,
        }
    }
}: AppProps) => {
    const { pathname } = window.location;
    let page = null;

    if (pathname === '/') {
        page = <ProjectListPage />;
    } else if (pathname.includes(GENERATOR_PAGE_PATH)) {
        page = <GeneratorPage
            list={questionList}
            onQuestionTitleChange={setQuestionTitleById}
            onQuestionAnswerListChange={setAnswerListById}
            onQuestionAdd={addQuestion}
            generateTable={generateAnswersForTable}
        />;
    }

    return (
        <div className="App">
            {page}
        </div>
    );
});

export default App;
