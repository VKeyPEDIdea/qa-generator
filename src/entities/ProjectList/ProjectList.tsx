import React from 'react';
import { observer } from 'mobx-react-lite';
import ProjectItem from './components/ProjectItem';
import { useStore } from 'features/store';

const ProjectList = () => {
  const {
    projectList: { projectListKeys },
  } = useStore();
  return (
    <ul>
      {projectListKeys.map((item) => {
        return <ProjectItem key={item} item={item} />
      })}
    </ul>
  );
};

export default observer(ProjectList);
