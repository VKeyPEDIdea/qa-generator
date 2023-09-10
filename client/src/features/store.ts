import QuestionListStore, { IQuestionListStore } from './questionList/questionListStore';
import ProjectListStore, { IProjectListStore } from './projectList/projectListStore';

export interface AppStore {
    store: {
        questions: IQuestionListStore;
        projectList: IProjectListStore;
    }
}

export default {
    questions: new QuestionListStore(),
    projectList: new ProjectListStore(),
};
