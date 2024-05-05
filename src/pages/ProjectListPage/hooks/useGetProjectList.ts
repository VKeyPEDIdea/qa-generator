import { useEffect } from 'react';
import { useStore } from 'features/store';

const useGetProjectList = () => {
  const {
    projectList: { projectListKeys, loadProjectList },
  } = useStore();
  useEffect(() => {
    if (projectListKeys.length === 0) loadProjectList();
  }, []);
};

export default useGetProjectList;
