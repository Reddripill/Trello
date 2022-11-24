import { nanoid } from '@reduxjs/toolkit';
import classNames from 'classnames';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';

function TodosForm({ todoListId }) {
	const [validate, setValidate] = useState(true)
	const [formValue, setFormValue] = useState('');
	const dispatch = useDispatch();

	const onSubmitHandler = event => {
		event.preventDefault();
		if (formValue) {
			dispatch(addTodo({ todoName: formValue, todoListId, id: nanoid(), drag: false, fulfilled: false }))
			setFormValue('');
		}
	}
	const validateHandler = event => {
		if (event.target.value.length === 0) {
			setValidate(false)
		} else {
			setValidate(true)
		}
	}
	const validateClassname = classNames('todos-list__validate', {
		'validate': validate
	})
	return (
		<form className='todos-list__form' onSubmit={onSubmitHandler}>
			<div className='todos-list__input'>
				<input
					className='todos-list__field'
					name='todos-list__field'
					value={formValue}
					onChange={event => setFormValue(event.target.value)}
					onBlur={validateHandler}
				/>
				<label
					htmlFor='todos-list__field'
					className={validateClassname}
				>
					Give me a name!
				</label>
			</div>
		</form>
	)
}

export default TodosForm