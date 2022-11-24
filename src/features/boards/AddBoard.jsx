import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addBoard } from './boardsSlice';
import classNames from 'classnames';

function AddBoard() {
	const [active, setActive] = useState(false);
	const [validate, setValidate] = useState(true);
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	const closeHandler = event => {
		setActive(false);
		event.stopPropagation();
	}

	const validateHandler = event => {
		if (event.target.value.length === 0) {
			setValidate(false)
		} else {
			setValidate(true)
		}
	}

	const createHandler = event => {
		event.preventDefault();
		if (name) {
			dispatch(addBoard(name));
			setName('');
			setActive(false);
		}
	}

	const headBoardClassname = classNames('board-creating-head', {
		'_active': active
	})

	const creatingBoardClassname = classNames('board-creating', {
		'_hide': !active
	})

	const validateClassname = classNames('board-creating-body__validation', {
		'validate': validate
	})

	return (
		<div className={creatingBoardClassname}>
			<div className={headBoardClassname} onClick={() => setActive(true)}>
				<div className='board-creating-head__title'>Create a new board</div>
				{active &&
					<div className='board-creating-head__close' onClick={closeHandler}>
						<AiFillCloseCircle />
					</div>
				}
			</div>
			{active &&
				<div className='board-creating-body'>
					<div className='board-creating-body__container'>
						<div className='board-creating-body__title'>What shall we call the board</div>
						<form className='board-creating-body__form' onSubmit={createHandler}>
							<div className='board-creating-body__input'>
								<input
									className='board-creating-body__field'
									type='text'
									name='board-creating-body__field'
									onChange={event => setName(event.target.value)}
									onBlur={validateHandler}
									value={name}
								/>
								<label
									htmlFor='board-creating-body__field'
									className={validateClassname}
								>
									Oops! Looks like you forgot the name.
								</label>
							</div>
						</form>
						<div className='board-creating-body__actions'>
							<button
								className='board-creating-body__cancel'
								onClick={closeHandler}
							>
								cancel
							</button>
							<button
								className='board-creating-body__create'
								onClick={createHandler}
							>
								create
							</button>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default AddBoard;