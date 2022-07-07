import QuestionListStore, { IQuestionListStore } from './questionList/questionListStore';

export interface AppStore {
    store: {
        questions: IQuestionListStore;
    }
}

export default {
    questions: new QuestionListStore(),
};
