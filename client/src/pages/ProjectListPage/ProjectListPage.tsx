import Button from 'shared/ui/Button';
import classes from './ProjectListPage.module.css';
import ProjectList from 'entities/ProjectList/ProjectList';
import { Link } from 'react-router-dom';

interface IProjectListPage {
    list: string[];
}

const ProjectListPage = ({
    list,
}: IProjectListPage) => {
    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <Link to={'/generator/qa-project-' + localStorage.length} >
                    <Button title="Новый проект"/>
                </Link>
            </div>
            <ProjectList projects={list}/>
        </div>
    );
};

export default ProjectListPage;