import { AppStore } from 'features/store';
import { observer } from 'mobx-react-lite';
import GeneratorPage from 'pages/GeneratorPage';
import './index.scss';

interface AppProps extends AppStore {};

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
    return (
        <div className="App">
            <GeneratorPage
                list={questionList}
                onQuestionTitleChange={setQuestionTitleById}
                onQuestionAnswerListChange={setAnswerListById}
                onQuestionAdd={addQuestion}
                generateTable={generateAnswersForTable}
            />
        </div>
    );
});

export default App;
