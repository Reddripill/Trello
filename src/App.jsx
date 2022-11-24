import React from 'react';
import './App.scss';
import AddBoard from './features/boards/AddBoard';
import BoardsList from './features/boards/BoardsList';
import { Routes, Route } from 'react-router-dom';
import SingleBoard from './features/boards/SingleBoard';
import Home from './components/Home';
import FulfilledTodos from './features/todos/FulfilledTodos';
import AllTodos from './features/todos/AllTodos';
import UnfulfilledTodos from './features/todos/UnfulfilledTodos';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />}>
				<Route index element={
					<section className='boards'>
						<AddBoard />
						<BoardsList />
					</section>
				}
				/>
				<Route path='boards/:boardId' element={<SingleBoard />} />
				<Route path='todos/fulfilled' element={<FulfilledTodos />} />
				<Route path='todos/all' element={<AllTodos />} />
				<Route path='todos/unfulfilled' element={<UnfulfilledTodos />} />
			</Route>
		</Routes>
	);
}

export default App;
