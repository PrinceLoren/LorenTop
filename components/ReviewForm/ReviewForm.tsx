import { ReviewFormProps as ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import CloseIcon from './close.svg';

import { Rating } from '../Rating/Rating';
import { Input } from '../input/input';
import { Textarea } from '../textarea/textarea';
import { Button } from '../Button/Button';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../helpers/api';


export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	
	const onSubmit = async (formdata: IReviewForm) => {
		try {
			const {data} = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formdata, productId});
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Something went wrong');
			} 
		} catch (e) {
			setError(e.message);
		}
	};
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input {...register('name', {required: {value: true, message: 'Enter Name'}})} 
				placeholder='Имя' 
				error={errors.name}
				/>
				<Input {...register('title', {required: {value: true, message: 'Enter title'}})} 
				placeholder='Заголовок отзыва' 
				className={styles.title} 
				error={errors.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{required: {value: true, message: 'Put stars'}}}
						render={({ field }) => (
							<Rating 
							isEditable 
							rating={field.value} 
							ref={field.ref} 
							setRating={field.onChange} 
							error={errors.rating}
							/>
						)}
					/>
				</div>
				<Textarea  {...register('description', {required: {value: true, message: 'Enter text'}})}
				placeholder='Текст отзыва' 
				className={styles.description} 
				error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance="primary">Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
			</div>}

			{error && <div className={cn(styles.error, styles.panel)}>
				Something went wrong, try page !	
				<CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
			</div>}
		</form>
	);
};