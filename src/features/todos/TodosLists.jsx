import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TodosForm from './TodosForm';
import Todos from './Todos';
import classNames from 'classnames';
import { dropTodo, removeTodoList, selectAllTodos } from './todosSlice';
import { IoMdClose } from 'react-icons/io';

function TodosLists({ boardId }) {
	const allLists = useSelector(selectAllTodos);
	const allTodo = useSelector(state => state.todos.todo)
	const dispatch = useDispatch();
	const correctsTodoLists = allLists.filter(todoList => todoList.boardId === boardId);

	const onDropHandler = (event, todoList) => {
		const dragedTodo = allTodo.find(todo => todo.drag === true);
		dispatch(dropTodo({ todoId: dragedTodo.todoListId, listId: todoList.id }))
	}

	const onDragOverHandler = event => {
		event.preventDefault();
	}

	const todoLists = correctsTodoLists.map(todoList => (
		<li
			key={todoList.id}
			className='todos-list__item'
			onDragOver={onDragOverHandler}
			onDrop={event => onDropHandler(event, todoList)}
		>
			<div
				className='todos-list__close'
				onClick={() => dispatch(removeTodoList({ todoListId: todoList.id }))}
			><IoMdClose /></div>
			<div className='todos-list__container'>
				<div className='todos-list__title'>{todoList.todoListName}</div>
				<TodosForm todoListId={todoList.id} />
				<Todos todoListId={todoList.id} />
			</div>
		</li>
	))

	const todosListClassname = classNames('todos-list', {
		'empty': !todoLists.length
	})

	return (
		<ul className={todosListClassname}>
			{todoLists}
		</ul>
	)
}

export default TodosLists;