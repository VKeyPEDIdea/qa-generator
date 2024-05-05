import React from 'react';
import ButtonIcon from 'shared/ui/ButtonIcon';
import classes from './ProjectItem.module.css';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  item: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  item
}) => {
  return (
    <li className={classes.item} key={item}>
      <p className={classes.title}>
        <Link to={`/generator/${item}`}>{item}</Link>
      </p>
      <div className={classes.actions}>
        <div className={classes.actions__item}>
          <ButtonIcon
            icon="edit"
            clickHandler={() => {
              console.log('edit');
            }}
            color="brown"
          />
        </div>
      </div>
    </li>
  )
};

export default ProjectItem;
