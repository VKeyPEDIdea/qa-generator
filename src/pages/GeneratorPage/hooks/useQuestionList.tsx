import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from 'features/store';

const useQuestionList = () => {
  const { projectName } = useParams();
  const {
    questions: { getQuestionList },
  } = useStore();

  useEffect(() => {
    getQuestionList(projectName || '');
  }, [projectName, getQuestionList]);
};

export default useQuestionList;
