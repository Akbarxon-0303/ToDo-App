import React, { useContext } from 'react'
import './Navbar.scss'
import { AuthContext } from '../../context/AuthContext'


export default function Navbar() {
	const { logout, isLogin } = useContext(AuthContext)
	return (
		<nav>
			<div className="nav-wrapper navbar light-green accent-3">
				<a href="/" className="brand-logo black-text">MERN Todo App</a>
				{
					isLogin
						? 	<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="/" className="black-text log" onClick={logout}>Logout</a></li>
							</ul>
						: 	<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="/" className="black-text log">Login</a></li>
							</ul>
				}
			</div>
		</nav>
	)
}
