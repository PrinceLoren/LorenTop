import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>
				PrinceLoren © 2020 - {format(new Date(), 'yyyy')}  All right reserved 
			</div>
			<a href="#" target="_blank">User Agreement</a>
			<a href="#" target="_blank">Privacy Policy</a>
		</footer>
	);
};