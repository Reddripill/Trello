import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dragTodo, removeTodo, toggleTodoFulfilled } from './todosSlice';
// import { TiTick } from 'react-icons/ti';

export function Todo({ todo, dark }) {
	const dispatch = useDispatch();
	const todosItemClassname = classNames('todos-purpose__item', {
		'_check': todo.fulfilled,
		'dark': dark,
	})

	const onDragStartHandler = (event, todo) => {
		dispatch(dragTodo({ id: todo.id }))
	}

	return (
		<li
			className={todosItemClassname}
			draggable={!dark}
			onDragStart={event => onDragStartHandler(event, todo)}
		>
			{todo.todoName}
			<div className='todos-purpose__actions'>
				<div
					className='todos-purpose__fulfilled'
					onClick={() => dispatch(toggleTodoFulfilled({ id: todo.id }))}
				></div>
				<div
					className='todos-purpose__remove'
					onClick={() => dispatch(removeTodo({ id: todo.id }))}
				>
				</div>
			</div>
		</li>
	)
}



function Todos({ todoListId }) {
	const allTodos = useSelector(state => state.todos.todo);
	const correctTodos = allTodos.filter(todo => todo.todoListId === todoListId);

	const todos = correctTodos.map(todo => (
		<Todo todo={todo} key={todo.id} />
	))
	return (
		<>
			{correctTodos.length > 0 &&
				<ul className='todos-purpose'>
					{todos}
				</ul>
			}
		</>
	)
}

export default Todos;