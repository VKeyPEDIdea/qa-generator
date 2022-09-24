import { Link } from 'react-router-dom';
import ButtonIcon from 'shared/ui/ButtonIcon';
import classes from './ProjectList.module.scss';

const ProjectList = ({ projects }: { projects: string[]}) => {
    return (
        <ul>
            {
                projects.map(item => {
                    return (
                        <li className={classes.item} key={item}>
                            <p className={classes.title}>
                                <Link to={'/generator/' + item}>
                                    {item}
                                </Link>
                            </p>
                            <div className={classes.actions}>
                                <div className={classes['actions__item']}>
                                    <ButtonIcon icon='edit' clickHandler={() => {console.log('edit')}} color='brown'/>
                                </div>
                            </div>
                        </li>
                    ) 
                })
            }
        </ul>
    );
};

export default ProjectList;