import { Link } from 'react-router-dom';
import classes from './ProjectList.module.scss';

const ProjectList = ({ projects }: { projects: string[]}) => {
    return (
        <ul>
            {
                projects.map(item => {
                    return (
                        <Link to={'/generator/' + item} key={item}>
                            <li className={classes.item}>{item}</li>
                        </Link>
                    ) 
                })
            }
        </ul>
    );
};

export default ProjectList;