import Button from 'shared/ui/Button';
import classes from './ProjectListPage.module.scss';
import ProjectList from 'entities/ProjectList/ProjectList';

interface IProjectListPage {
    list: string[];
}

const ProjectListPage = ({
    list,
}: IProjectListPage) => {
    const openNewProject = () => {
        window.location.assign('qa-generator/build/generator/qa-project-' + localStorage.length);
    };

    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <Button title="Новый проект" onClick={openNewProject}/>
            </div>
            <ProjectList projects={list}/>
        </div>
    );
};

export default ProjectListPage;