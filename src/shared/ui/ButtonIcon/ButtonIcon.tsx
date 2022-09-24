import Color from 'shared/types/Color.type';
import GIcon from '../GIcon';
import { GIconTitle } from '../GIcon/GIconTitle';
import classes from './ButtonIcon.module.scss';

interface ButtonIconProps {
    icon: GIconTitle;
    color: Color;
    clickHandler: () => void;
}

const ButtonIcon = ({
    icon,
    color,
    clickHandler,
}: ButtonIconProps) => {
    return (
        <div className={classes.btn} onClick={clickHandler}>
            <GIcon color={color} title={icon}/>
        </div>
    );
};

export default ButtonIcon;