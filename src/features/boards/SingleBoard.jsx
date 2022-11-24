import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { addTodoList } from '../todos/todosSlice';
import TodosLists from '../todos/TodosLists';
import { nanoid } from '@reduxjs/toolkit';
import { selectBoardById } from './boardsSlice';
import classNames from 'classnames';

function SingleBoard() {
	const { boardId } = useParams();
	const [active, setActive] = useState(false);
	const [listname, setListname] = useState('');
	const [validate, setValidate] = useState(true);
	const dispatch = useDispatch()

	const board = useSelector(state => selectBoardById(state, boardId))

	const closeHandler = event => {
		event.stopPropagation();
		setActive(false);
	}

	const onSubmitHandler = event => {
		event.preventDefault();
		if (listname) {
			dispatch(addTodoList({ boardId: board.id, todoListName: listname, id: nanoid() }));
			setListname('');
			setActive(false)
		}
	}

	const validateHandler = event => {
		if (event.target.value.length === 0) {
			setValidate(false)
		} else {
			setValidate(true)
		}
	}

	const validateClassname = classNames('single-board-form__validation', {
		'validate': validate
	})


	return (
		<section className='single-board'>
			<div className='single-board__header'>
				<div className='single-board__title'>{board.boardName}</div>
				<div className='single-board__adding'>
					{active ?
						<div className='single-board-form'>
							<form className='single-board-form__form' onSubmit={onSubmitHandler}>
								<div className='single-board-form__input'>
									<input
										className='single-board-form__field'
										name='single-board-form__field'
										value={listname}
										onChange={event => setListname(event.target.value)}
										onBlur={validateHandler}
									/>
									<label
										htmlFor='single-board-form__field'
										className={validateClassname}
									>
										Give me a name!
									</label>
								</div>
							</form>
							<div className='single-board-form__close' onClick={closeHandler}>
								<IoMdClose />
							</div>
						</div>
						:
						<div className='single-board-addlist' onClick={() => setActive(true)}>
							Add a list...
						</div>
					}
				</div>

			</div>
			<div className='single-board__content'>
				<TodosLists boardId={boardId} />
			</div>
		</section>
	)
}

export default SingleBoard;