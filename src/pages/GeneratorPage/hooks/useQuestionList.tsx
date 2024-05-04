import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const useQuestionList = (queryFn: (projectName: string) => void) => {
	const { projectName } = useParams();
    
	useEffect(() => {
		queryFn(projectName || '');
	}, [projectName]);
};

export default useQuestionList;

