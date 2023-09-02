/* eslint-disable max-len */
import { GIconProps } from './GIconProps.model';

const COLORS = {
    brown: '#986D43',
};

const GIcon = ({
	title,
	color,
    size = 24
}: GIconProps) => {
	let pathes;

	switch (title) {
		case 'house':
			pathes = (
				<>
					<path d="M0,0H24V24H0Z" fill="none"/>
					<path d="M10,20V14h4v6h5V12h3L12,3,2,12H5v8Z" fill={COLORS[color]}/>
				</>
			);
			break;
		case 'hotel':
			pathes = (
				<>
					<path d="M17,11V3H7V7H3V21h8V17h2v4h8V11ZM7,19H5V17H7Zm0-4H5V13H7Zm0-4H5V9H7Zm4,4H9V13h2Zm0-4H9V9h2Zm0-4H9V5h2Zm4,8H13V13h2Zm0-4H13V9h2Zm0-4H13V5h2Zm4,12H17V17h2Zm0-4H17V13h2Z" fill={COLORS[color]}/>
				</>
			);
			break;
        case 'edit':
            pathes = (
                <>
                    <path d="M18.85 8.65 15.475 5.3l2.4-2.375 3.35 3.375ZM3.65 20.5v-3.375L14.4 6.375l3.375 3.375L7.025 20.5Z" fill={COLORS[color]}/>
                </>
            );
            break;
        default:
			break;
	}

	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}>
				{pathes}
			</svg>
		</>
	);
};

export default GIcon;