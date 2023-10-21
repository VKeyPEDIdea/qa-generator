import debounce from "shared/utils/debounce";

const API_URL = 'http://localhost:8001/';
const projectName = 'test';

const api = {
    question: {
        update: debounce((id: string, title: string) => {
            fetch(`${API_URL}${projectName}/question/update/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            }).then(res => res);
        })
    }
};

export default api;
