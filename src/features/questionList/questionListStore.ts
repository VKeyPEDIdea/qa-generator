import { makeAutoObservable } from 'mobx';

export interface IQuestionListItem {
    id: string;
    title: string;
    answerList: string[];
}

export interface IQuestionListStore {
    questionList: IQuestionListItem[];
    setQuestionTitleById(id: string, title: string): void;
    setAnswerListById(id: string, answerList: string[]): void;
}

const initialQuestionList: IQuestionListItem[] = [
    {
        id: '1',
        title: '',
        answerList: [],
    },
];

class QuestionListStore implements IQuestionListStore {
    questionList: IQuestionListItem[];

    constructor() {
        this.questionList = initialQuestionList;
        this.setQuestionTitleById = this.setQuestionTitleById.bind(this);
        this.setAnswerListById = this.setAnswerListById.bind(this);
        makeAutoObservable(this);
    }

    setQuestionTitleById(id: string, title: string) {
        const question = this.questionList.find(item => item.id === id);
        if (question) {
            const newQuestion = {
                ...question,
                title
            };
            this.questionList = this.questionList.map(item => item.id === id ? newQuestion : item);
        }
    }

    setAnswerListById(id: string, answerList: string[]) {
        const question = this.questionList.find(item => item.id === id);
        if (question) {
            const newQuestion = {
                ...question,
                answerList
            };
            this.questionList = this.questionList.map(item => item.id === id ? newQuestion : item);
        }
    }
}

export default QuestionListStore;