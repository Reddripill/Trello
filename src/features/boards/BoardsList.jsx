import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeBoard, selectAllBoards } from './boardsSlice';
import { IoMdClose } from 'react-icons/io';

function BoardsList() {
	const dispatch = useDispatch();
	const boards = useSelector(selectAllBoards);
	const removeBoardHandler = (event, boardId) => {
		dispatch(removeBoard(boardId))
	}
	const boardsList = boards.map(board => (
		<li className='new-boards__item' key={board.id}>
			<Link
				to={`/boards/${board.id}`}
				className='new-boards__link'
			>
				{board.boardName}
			</Link>
			<div
				className='new-boards__remove'
				onClick={event => removeBoardHandler(event, board.id)}
			>
				<IoMdClose />
			</div>
		</li>
	))
	return (
		<div className='new-boards'>
			<ul className='new-boards__list'>
				{boardsList}
			</ul>
		</div>
	)
}

export default BoardsList;