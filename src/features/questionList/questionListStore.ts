import { makeAutoObservable } from 'mobx';
import getFromStorage from 'shared/utils/getFromStorage';
import getRandomInt from 'shared/utils/getRandomNumber';
import saveToStorage from 'shared/utils/saveToStorage';

export const QUESTION_LIST_KEY = 'questionList';

export interface IQuestionListItem {
    id: string;
    title: string;
    answerList: string[];
}

export interface IQuestionListStore {
    questionList: IQuestionListItem[];
    setQuestionTitleById(id: string, title: string): void;
    setAnswerListById(id: string, answerList: string[]): void;
    addQuestion(): void;
    generateAnswersForTable(responseAmount: number): Array<string[]>
}

const initialQuestionList: IQuestionListItem[] = getFromStorage(QUESTION_LIST_KEY) ? getFromStorage(QUESTION_LIST_KEY) : [
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
        this.addQuestion = this.addQuestion.bind(this);
        this.generateAnswersForTable = this.generateAnswersForTable.bind(this);
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
        saveToStorage(QUESTION_LIST_KEY, this.questionList);
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
        saveToStorage(QUESTION_LIST_KEY, this.questionList);
    }

    addQuestion() {
        const newQuestion: IQuestionListItem = {
            id: String(this.questionList.length + 1),
            title: '',
            answerList: [],
        };
        this.questionList = [ ...this.questionList, newQuestion];
        saveToStorage(QUESTION_LIST_KEY, this.questionList);
    }

    generateAnswersForTable(responseAmount: number): Array<string[]> {
        let answers: Array<string[]> = [];
        
        for (let i = 0; i < responseAmount; i++) {
            answers.push(this.questionList.map(item => {
                const randomNumber = getRandomInt(item.answerList.length);
                return item.answerList[randomNumber];
            }));
        }
        return answers;
    }
}

export default QuestionListStore;