import { TextareaProps } from './textarea.props';
import styles from './textarea.module.css';
import cn from 'classnames';

export const Textarea = ({  className, ...props}: TextareaProps): JSX.Element => {
	return (
		<textarea className={cn(className, styles.textarea)} {...props} />
	);
};