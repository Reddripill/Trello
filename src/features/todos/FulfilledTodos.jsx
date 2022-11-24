import React from 'react'
import { useSelector } from 'react-redux';
import { Todo } from './Todos';

function FulfilledTodos() {
	const allTodos = useSelector(state => state.todos.todo);
	const fulfilledTodos = allTodos.filter(todo => todo.fulfilled);
	const fulfilledList = fulfilledTodos.map(todo => (
		<Todo key={todo.id} todo={todo} dark={true} />
	))
	return (
		<div className='fulfilled-todos todo-list'>
			<div className='fulfilled-todos__title todo-list__title'>Fulfilled Todos</div>
			{fulfilledTodos.length === 0 ?
				<div className='fulfilled-todos__nothing todo-list__nothing'>Not fulfilled todos</div> :
				<ul className='fulfilled-todos__body todo-list__body'>{fulfilledList}</ul>
			}
		</div>
	)
}

export default FulfilledTodos;