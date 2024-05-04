import GeneratorPage from 'pages/GeneratorPage';
import ProjectListPage from 'pages/ProjectListPage/ProjectListPage';
import { Route, Routes } from 'react-router';
import './index.css';

const GENERATOR_PAGE_PATH = '/generator/:projectName';

const App = () => {
    return (
		<Routes>
			<Route path="/" element={<ProjectListPage />} />
			<Route path={GENERATOR_PAGE_PATH} element={<GeneratorPage />}/>
		</Routes>
    );
};

export default App;
