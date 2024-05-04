import { createContext, useContext } from 'react';
import QuestionListStore, { IQuestionListStore } from './questionList/questionListStore';
import ProjectListStore, { IProjectListStore } from './projectList/projectListStore';

export interface AppStore {
    questions: IQuestionListStore;
    projectList: IProjectListStore;
}

export default {
    questions: new QuestionListStore(),
    projectList: new ProjectListStore(),
};

export const StoreContext = createContext<AppStore>(null);
export const useStore = () => useContext(StoreContext);
