import { useState, useEffect } from 'react';
import './App.scss';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const backendUrl = 'http://localhost:3016';

function App() {
	const [users, setUsers] = useState([]);

	const loadUsers = () => {
		(async () => {
			const response = await fetch(backendUrl);
			const data = await response.json();
			setUsers(data);
		})();
	}

	useEffect(() => {
		loadUsers();
	}, []);

	const handleEditButton = (user) => {
		(async () => {
			await fetch(`${backendUrl}/deleteuser/${user._id}`, { method: 'DELETE'});
			loadUsers();
		})();
	}

	return (
		<div className="App">
			<h1>Edit User App Frontend</h1>
			<div className="addUserArea">
				<div><button>Add User</button></div>
			</div>
			<section className="users">
				{users.map((user, index) => {
					return (
						<div key={index} className="userCard">
							<div className="row">
								<div className="label">Full Name:</div>
								<div className="data">{user.name}</div>
							</div>
							<div className="row">
								<div className="label">User Name:</div>
								<div className="data">{user.username}</div>
							</div>
							<div className="row">
								<div className="label">E-Mail:</div>
								<div className="data">{user.email}</div>
							</div>
							<div className="iconRow">
								<button onClick={() => handleEditButton(user)} className="icon"><RiDeleteBin6Line /></button>
								<button className="icon"><GrEdit /></button>
							</div>
						</div>
					)
				})}
			</section>
		</div>
	);
}

export default App;