import { ReviewFormProps as ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import CloseIcon from './close.svg';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import { Rating } from '../Rating/Rating';
import { Input } from '../input/input';
import { Textarea } from '../textarea/textarea';
import { Button } from '../Button/Button';


export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	
	return (
		<>
			<div className={cn(styles.reviewForm, className)}
			{...props}
		>
			<Input placeholder='Name' />
			<Input placeholder='Title'  className={styles.title}/>
			<div className={styles.rating}>
					<span>Review:</span>
					<Rating rating={0}/>
			</div>
			<Textarea  placeholder='Text review'  className={styles.description}/>	
			<div className={styles.submit}>
				<Button appearance='primary'>Send</Button>
				<span className={styles.info}>* Before publication, the review will pass preliminary moderation and verification</span>
			</div>
		</div>
		<div className={styles.success}>
			<div className={styles.successTitle}>You review is sended</div>
			<div>
				Thank you, your review will be published after check
			</div>
			<CloseIcon className={styles.close}/>
		</div>
		</>
	);
};