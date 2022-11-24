import React from 'react'
import { useSelector } from 'react-redux';
import { Todo } from './Todos';

function UnfulfilledTodos() {
	const allTodos = useSelector(state => state.todos.todo);
	const unfulfilledTodos = allTodos.filter(todo => !todo.fulfilled);
	const unfulfilledList = unfulfilledTodos.map(todo => (
		<Todo key={todo.id} todo={todo} dark={true} />
	))
	return (
		<div className='unfulfilled-todos todo-list'>
			<div className='unfulfilled-todos__title todo-list__title'>Unfulfilled Todos</div>
			{unfulfilledTodos.length === 0 ?
				<div className='unfulfilled-todos__nothing todo-list__nothing'>Not Unfulfilled todos</div> :
				<ul className='unfulfilled-todos__body todo-list__body'>{unfulfilledList}</ul>
			}
		</div>
	)
}

export default UnfulfilledTodos;