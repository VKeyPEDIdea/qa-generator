import { makeAutoObservable } from 'mobx';
import getFromStorage from 'shared/utils/getFromStorage';
import getRandomInt from 'shared/utils/getRandomNumber';
import saveToStorage from 'shared/utils/saveToStorage';

export interface Answer {
    text: string;
    percentage: number;
    amount: number;
    count: number;
}

export interface IQuestionListItem {
    id: string;
    title: string;
    answerList: Answer[];
}

export interface IQuestionListStore {
    questionList: IQuestionListItem[];
    setQuestionTitleById(id: string, title: string): void;
    addAnswersByQuestionId(id: string, answerList: Answer[]): void;
    addQuestion(): void;
    generateAnswersForTable(responseAmount: number): Array<Answer[]>;
    getQuestionList(key: string): void;
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
    projectTitle: string;;

    constructor() {
        this.questionList = initialQuestionList;
        this.projectTitle = '';
        this.setQuestionTitleById = this.setQuestionTitleById.bind(this);
        this.addAnswersByQuestionId = this.addAnswersByQuestionId.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.generateAnswersForTable = this.generateAnswersForTable.bind(this);
        makeAutoObservable(this);
    }

    setProjectTitle(title: string) {
        if (!getFromStorage(title)) {
            localStorage.removeItem(this.projectTitle);
            this.projectTitle = title;
            saveToStorage(this.projectTitle, this.questionList);
            return true;
        }

        return false;
    }

    getQuestionList = (key: string) => {
        if (getFromStorage(key)) {
            this.questionList = getFromStorage(key) || initialQuestionList;
        }
        this.projectTitle = key;
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
        saveToStorage(this.projectTitle, this.questionList);
    }

    addAnswersByQuestionId(id: string, answerList: Answer[]) {
        const question = this.questionList.find(item => item.id === id);
        if (question) {
            const updatedAnswerList = [ ...question.answerList, ...answerList ]
            const updatedQuestion = {
                ...question,
                answerList: updatedAnswerList,
            };
            this.questionList = this.questionList.map(item => item.id === id ? updatedQuestion : item);
        }
        saveToStorage(this.projectTitle, this.questionList);
    }

    addQuestion() {
        const newQuestion: IQuestionListItem = {
            id: String(this.questionList.length + 1),
            title: '',
            answerList: [],
        };
        this.questionList = [ ...this.questionList, newQuestion];
        saveToStorage(this.projectTitle, this.questionList);
    }

    generateAnswersForTable(responseAmount: number): Array<Answer[]> {
        let answers: Array<Answer[]> = [];
        
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