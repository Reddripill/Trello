import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import { AiFillHome } from 'react-icons/ai';

function Home() {
	return (
		<div className='container'>
			<nav className='trello-header'>
				<Link to='/' className='trello-header__route'>
					Home
				</Link>
				<Link to='/todos/all' className='trello-header__route'>
					All todos
				</Link>
				<Link to='/todos/fulfilled' className='trello-header__route'>
					fulfilled todos
				</Link>
				<Link to='/todos/unfulfilled' className='trello-header__route'>
					unfulfilled todos
				</Link>
			</nav>
			<Outlet />
		</div>
	)
}

export default Home