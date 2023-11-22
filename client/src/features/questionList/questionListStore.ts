import api from 'api';
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
    counter: number;
    setQuestionTitleById(id: string, title: string): void;
    addAnswersByQuestionId(id: string, answerList: Answer[]): void;
    addQuestion(): void;
    generateAnswersForTable(numRespondents: number): Array<Answer[]>;
    getQuestionList(key: string): void;
    getAnswerListByQuestionId(id: string): Answer[];
    deleteAnswerByQuestionId(id: string, answerText: string): void;
    changeAnswerPercentage(id: string, answerText: string, percentage: number): void;
    deleteQuestion(id: string): void;
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
    counter: number;

    constructor() {
        this.questionList = initialQuestionList;
        this.answerList = [];
        this.projectTitle = '';
        this.counter = 0;
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
        const idList = this.questionList.map(({id}) => +id);
        this.counter = Math.max(...idList) + 1;
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
        api.question.update(id, title, this.projectTitle);
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
            id: this.counter + '',
            title: '',
        };
        this.counter++;
        this.questionList = [ ...this.questionList, newQuestion];
        this.saveProject();
    }

    deleteAnswerByQuestionId = (id: string, answerText?: string) => {
        const filterByIdAndText = ({ text, questionId }: Answer) => questionId !== id || text !== answerText;
        const filterById = ({ questionId }: Answer) => questionId !== id;
        const updatedAnswerList = this.answerList.filter(answerText ? filterByIdAndText : filterById);
        this.answerList = updatedAnswerList;
        this.saveProject();
    }

    deleteQuestion = (id: string) => {
        const updatedQuestionList = this.questionList.filter(item => item.id !== id);
        this.questionList = [ ... updatedQuestionList ];
        this.deleteAnswerByQuestionId(id);
        this.saveProject();
    } 

    generateAnswersForTable(numRespondents: number): Array<Answer[]> {
        const answers: Array<Answer[]> = [];

        for (const answer of this.answerList) {
            answer.amount = Math.floor((answer.percentage / 100) * numRespondents);
        }

        for (let i = 0; i < numRespondents; i++) {
            const respondentAnswers: Answer[] = [];
            for (const item of this.questionList) {
                const answerList = this.getAnswerListByQuestionId(item.id);
                const selected = this.getRandomAnswer(answerList);
                if (selected) respondentAnswers.push(selected);                                
            }
            answers.push(respondentAnswers);
        }
        for (const answer of this.answerList) answer.count = 0;
        return answers;
    }
    
    getRandomAnswer(answerList: Answer[]): Answer | null {
        const randomNumber = getRandomInt(answerList.length);
        const selected = answerList[randomNumber];
        if (selected.count < selected.amount) {
            selected.count++;
            return selected;
        }
        const reducedList = answerList.filter(answer => answer.text !== selected.text);
        if (reducedList.length) return this.getRandomAnswer(reducedList);
        return null;
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