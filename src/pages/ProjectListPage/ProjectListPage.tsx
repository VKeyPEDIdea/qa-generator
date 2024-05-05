import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import ProjectList from 'entities/ProjectList/ProjectList';
import Button from 'shared/ui/Button';
import classes from './ProjectListPage.module.css';
import useGetProjectList from './hooks/useGetProjectList';

const ProjectListPage = () => {
  useGetProjectList();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Link to={`/generator/qa-project-${localStorage.length}`}>
          <Button title="Новый проект" />
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default memo(ProjectListPage);
