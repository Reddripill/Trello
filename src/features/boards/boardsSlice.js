import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { removeTodoLists } from "../todos/todosSlice";

const boardsAdapter = createEntityAdapter();

export const removeBoard = (boardId) => (dispatch, getState) => {
	const todoLists = Object.values(getState().todos.entities).filter(todo => (
		todo.boardId === boardId
	))
	const todoListIds = todoLists.map(todoList => todoList.id)
	dispatch(removeBoards({ boardId }))
	dispatch(removeTodoLists({ todoListIds }))
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState: boardsAdapter.getInitialState(),
	reducers: {
		addBoard: {
			reducer(state, action) {
				boardsAdapter.addOne(state, action.payload)
			},
			prepare(name) {
				return {
					payload: {
						boardName: name,
						id: nanoid(),
					}
				}
			}
		},
		removeBoards(state, action) {
			boardsAdapter.removeOne(state, action.payload.boardId);
		}
	}
})

export const { addBoard, removeBoards } = boardsSlice.actions;

export const {
	selectAll: selectAllBoards,
	selectById: selectBoardById
} = boardsAdapter.getSelectors(state => state.boards);

export default boardsSlice.reducer;