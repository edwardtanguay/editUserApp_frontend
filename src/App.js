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
			const users = await response.json();
			users.forEach(user => user.isEditingEmail = false);
			setUsers(users);
		})();
	}

	useEffect(() => {
		loadUsers();
	}, []);

	const handleDeleteButton = (user) => {
		(async () => {
			await fetch(`${backendUrl}/deleteuser/${user._id}`, { method: 'DELETE' });
			loadUsers();
		})();
	}

	const handleEditButton = (user) => {
		user.isEditingEmail = !user.isEditingEmail;
		setUsers([...users]);
	}

	const handleEmailChange = (user, e) => {
		user.email = e.target.value;
		setUsers([...users]);
	}

	const handleEmailSave = (user) => {
		(async () => {
			await fetch(`${backendUrl}/edituseremail/${user._id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: user.email
				})
			});
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
								{!user.isEditingEmail && (
									<div className="data">{user.email}</div>
								)}
								{user.isEditingEmail && (
									<div className="data editing"><input type="text" onChange={(e) => handleEmailChange(user, e)} value={user.email} /><button onClick={() => handleEmailSave(user)}>Save</button><button onClick={() => handleEditButton(user)}>Cancel</button></div>
								)}
							</div>
							<div className="iconRow">
								<button onClick={() => handleDeleteButton(user)} className="icon"><RiDeleteBin6Line /></button>
								<button className="icon" onClick={() => handleEditButton(user)}><GrEdit /></button>
							</div>
						</div>
					)
				})}
			</section>
		</div>
	);
}

export default App;