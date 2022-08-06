import Button from 'shared/ui/Button';

interface IProjectListPage {
    list: string[];
}

const ProjectListPage = ({
    list,
}: IProjectListPage) => {
    const openNewProject = () => {
        window.location.assign('/generator/qa-project-' + localStorage.length);
    };

    return (
        <div>
            <Button title="Новый проект" onClick={openNewProject}/>
            {list.map(item => <p onClick={() => window.location.assign('/generator/' + item)}>{item}</p>)}
        </div>
    );
};

export default ProjectListPage;