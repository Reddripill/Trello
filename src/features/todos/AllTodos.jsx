import React from 'react'
import { useSelector } from 'react-redux';
import { Todo } from './Todos';

function AllTodos() {
	const allTodos = useSelector(state => state.todos.todo);
	const fulfilledList = allTodos.map(todo => (
		<Todo key={todo.id} todo={todo} dark={true} />
	))
	return (
		<div className='all-todos todo-list'>
			<div className='all-todos__title todo-list__title'>All Todos</div>
			{allTodos.length === 0 ?
				<div className='all-todos__nothing todo-list__nothing'>Not Todos</div> :
				<ul className='all-todos__body todo-list__body'>{fulfilledList}</ul>
			}
		</div>
	)
}

export default AllTodos;