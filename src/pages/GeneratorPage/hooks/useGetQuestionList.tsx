import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const useGetQuestionList = (queryFn) => {
	const { projectName } = useParams();
    
	useEffect(() => {
		queryFn(projectName || '');
	}, [projectName]);
};

export default useGetQuestionList;

