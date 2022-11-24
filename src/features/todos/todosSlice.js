import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


export const todosAdapter = createEntityAdapter()

const todosSlice = createSlice({
	name: 'todos',
	initialState: todosAdapter.getInitialState({
		todo: []
	}),
	reducers: {
		addTodoList(state, action) {
			todosAdapter.addOne(state, action.payload)
		},
		addTodo(state, action) {
			state.todo.push(action.payload)
		},
		dragTodo(state, action) {
			const { id } = action.payload;
			const existingTodoItem = state.todo.find(todo => todo.id === id);
			existingTodoItem.drag = true;
		},
		dropTodo(state, action) {
			const { todoId, listId } = action.payload;
			const existingTodoItem = state.todo.find(todo => todo.todoListId === todoId);
			existingTodoItem.todoListId = listId;
			existingTodoItem.drag = false;
		},
		toggleTodoFulfilled(state, action) {
			const id = action.payload.id;
			const existingTodoItem = state.todo.find(item => item.id === id);
			existingTodoItem.fulfilled = !existingTodoItem.fulfilled;
			state.todo.sort((a, b) => a.fulfilled - b.fulfilled)
		},
		removeTodo(state, action) {
			const id = action.payload.id;
			state.todo.forEach((item, index, arr) => {
				if (item.id === id) {
					arr.splice(index, 1);
				}
			});
		},
		removeTodoList(state, action) {
			const todoListId = action.payload.todoListId;
			state.todo = state.todo.filter(todo => todo.todoListId !== todoListId);
			todosAdapter.removeOne(state, todoListId);
		},
		removeTodoLists(state, action) {
			const todoListIds = action.payload.todoListIds;
			state.todo = state.todo.filter(todo => (
				todoListIds.filter(todoListId => todo.todoListId === todoListId).length === 0
			))
			todosAdapter.removeMany(state, todoListIds);
		}
	}
})

export const {
	addTodo,
	addTodoList,
	dragTodo,
	dropTodo,
	toggleTodoFulfilled,
	removeTodo,
	removeTodoList,
	removeTodoLists,
} = todosSlice.actions;


export const {
	selectAll: selectAllTodos,
	selectById: selectTodoById,
} = todosAdapter.getSelectors(state => state.todos);

export default todosSlice.reducer;