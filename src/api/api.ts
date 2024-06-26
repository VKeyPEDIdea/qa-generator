import { Answer } from "features/questionList/questionListStore";
import debounce from "shared/utils/debounce";

const API_URL = 'http://localhost:8001/';

const api = {
	question: {
		update: debounce((id: string, title: string, projectName: string) => {
			fetch(`${API_URL}${projectName}/question/update/${id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title }),
			}).then(res => res);
		})
	},
	answer: {
		create: (answers: Answer[], projectName: string) => {
			fetch(`${API_URL}${projectName}/answer/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers }),
			});
		},
		delete: (answerId: number, projectName: string) => {
			fetch(`${API_URL}${projectName}/answer/delete/${answerId}`, {
				method: 'POST',
			});
		},
	},
	project: {
		getQuestionList: async (projectName: string) => {
			const list = await fetch(`${API_URL}${projectName}/project/getQuestionList`, {
				method: 'POST'
			});
			return list.json();
		}, 
	},
	general: {
		getProjectList: async () => {
			const projectList = await fetch(`${API_URL}/general/getProjectList`, {
				method: 'POST',
			}).then(res => res.json());
			return projectList as string[];
		},
	}
};

export default api;
