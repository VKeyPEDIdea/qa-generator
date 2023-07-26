import { makeAutoObservable } from 'mobx';
import getFromStorage from 'shared/utils/getFromStorage';
import getRandomInt from 'shared/utils/getRandomNumber';
import saveToStorage from 'shared/utils/saveToStorage';

export interface Answer {
    text: string;
    percentage: number;
    amount: number;
    count: number;
    questionId: string;
}

export interface IQuestionListItem {
    id: string;
    title: string;
}

export interface IQuestionListStore {
    questionList: IQuestionListItem[];
    answerList: Answer[];
    setQuestionTitleById(id: string, title: string): void;
    addAnswersByQuestionId(id: string, answerList: Answer[]): void;
    addQuestion(): void;
    generateAnswersForTable(responseAmount: number): Array<Answer[]>;
    getQuestionList(key: string): void;
    getAnswerListByQuestionId(id: string): Answer[];
    deleteAnswerByQuestionId(id: string, answerText: string): void;
    changeAnswerPercentage(id: string, answerText: string, percentage: number): void;
}

const initialQuestionList: IQuestionListItem[] = [
    {
        id: '1',
        title: '',
    },
];

class QuestionListStore implements IQuestionListStore {
    questionList: IQuestionListItem[];
    answerList: Answer[];
    projectTitle: string;

    constructor() {
        this.questionList = initialQuestionList;
        this.answerList = [];
        this.projectTitle = '';
        this.setQuestionTitleById = this.setQuestionTitleById.bind(this);
        this.addAnswersByQuestionId = this.addAnswersByQuestionId.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.generateAnswersForTable = this.generateAnswersForTable.bind(this);
        this.saveProject = this.saveProject.bind(this);
        makeAutoObservable(this);
    }

    setProjectTitle(title: string) {
        if (!getFromStorage(title)) {
            localStorage.removeItem(this.projectTitle);
            this.projectTitle = title;
            this.saveProject();
            return true;
        }

        return false;
    }

    getQuestionList = (key: string) => {
        const response = getFromStorage(key); 
        if (response) {
            const { questionList, answerList } = response;
            this.questionList = questionList || initialQuestionList;
            this.answerList = answerList || [];
        }
        this.projectTitle = key;
    }

    getAnswerListByQuestionId = (id: string): Answer[] => {
        return this.answerList.filter(({ questionId }) => questionId === id);
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
        this.saveProject();
    }

    addAnswersByQuestionId(id: string, answerList: Answer[]) {
        const question = this.questionList.find(item => item.id === id);
        if (question) {
            this.answerList = [ ...this.answerList, ...answerList ];
        }
        this.saveProject();
    }

    addQuestion() {
        const newQuestion: IQuestionListItem = {
            id: String(this.questionList.length + 1),
            title: '',
        };
        this.questionList = [ ...this.questionList, newQuestion];
        this.saveProject();
    }

    deleteAnswerByQuestionId = (id: string, answerText: string) => {
        const question = this.questionList.find(item => item.id === id);
        if (question) {
            const updatedAnswerList = this.answerList.filter(({ text, questionId }) => questionId !== id || text !== answerText);
            this.answerList = updatedAnswerList;
            this.saveProject();
        }
    }

    generateAnswersForTable(responseAmount: number): Array<Answer[]> {
        let answers: Array<Answer[]> = [];
        
        for (let i = 0; i < responseAmount; i++) {
            answers.push(this.questionList.map(item => {
                const answerList = this.getAnswerListByQuestionId(item.id);
                const randomNumber = getRandomInt(answerList.length);
                return answerList[randomNumber];
            }));
        }
        return answers;
    }

    changeAnswerPercentage = (id: string, answerText: string, percentage: number) => {
        const targetAnswer = this.answerList.find(({ text, questionId }) => questionId === id && text === answerText);
        if (targetAnswer) {
            targetAnswer.percentage = percentage;
            this.saveProject();
        }
    }

    saveProject() {
        saveToStorage(this.projectTitle, { questionList: this.questionList, answerList: this.answerList });
    }
}

export default QuestionListStore;