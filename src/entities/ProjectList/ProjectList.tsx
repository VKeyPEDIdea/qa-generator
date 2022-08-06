import classes from './ProjectList.module.scss';

const ProjectList = ({ projects }: { projects: string[]}) => {
    const openProject = (name: string) => {
        window.location.assign('/generator/' + name);
    };

    return (
        <ul>
            {
                projects.map(item => {
                    return <li className={classes.item} onClick={() => openProject(item)}>{item}</li>
                })
            }
        </ul>
    );
};

export default ProjectList;