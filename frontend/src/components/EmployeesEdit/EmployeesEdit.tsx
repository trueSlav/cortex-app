import { useNavigate, useParams } from 'react-router'
import MyInput from '../UI/MyInput/MyInput.tsx'
import MyButton from '../UI/Button/MyButton.tsx'
import { Edit3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import apiFetch from '../../api/apiFetch.ts'

const EmployeesEdit = () => {
	const { id } = useParams()
	const [user, setUser] = useState([])
	const [departments, setDepartments] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		fetchUser()
		fetchDepartments()
	}, [])

	const fetchDepartments = async () => {
		const response = await apiFetch('get', '/departments')
		setDepartments(response)
	}

	const fetchUser = async () => {
		const response = await apiFetch('get', `/users/edit/${id}`)
		response[0].hire_date = response[0].hire_date.split('T')[0]
		setUser(response[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const response = await apiFetch('put', `/users/edit/${id}`, user)
		navigate('/users')
	}

	return (
		<form onSubmit={handleSubmit}>
			`{user.first_name} {user.last_name} {user.middle_name} {user.position}{' '}
			{user.hire_date}`
			<MyInput
				required
				defaultValue={user.first_name}
				type='text'
				placeholder='Valeriy'
				name='first_name'
				onChange={e => setUser({ ...user, first_name: e.target.value })}
			>
				<span>Name</span>
			</MyInput>
			<MyInput
				required
				defaultValue={user.last_name}
				type='text'
				placeholder='Jmishenko'
				name='last_name'
				onChange={e => setUser({ ...user, last_name: e.target.value })}
			>
				<span>Surname</span>
			</MyInput>
			<MyInput
				required
				defaultValue={user.middle_name}
				placeholder='Albertovich'
				name='middle_name'
				type='text'
				onChange={e => setUser({ ...user, middle_name: e.target.value })}
			>
				<span>Patronymic</span>
			</MyInput>
			<MyInput
				required
				defaultValue={user.hire_date}
				name='hire_date'
				type='date'
				onChange={e => setUser({ ...user, hire_date: e.target.value })}
			>
				<span>Select start date</span>
			</MyInput>
			<select
				required
				style={{ color: '#ffcc14' }}
				name='position'
				id='position'
				defaultValue={user.position}
				onChange={e => setUser({ ...user, position: e.target.value })}
			>
				{departments.map(department => (
					<option
						selected={user.position === department.dep_name}
						style={{ color: '#ffcc14', backgroundColor: 'inherit' }}
						key={department.id}
					>
						{department.dep_name}
					</option>
				))}
			</select>
			<MyButton type='submit'>
				<Edit3 />
				<p>Edit user</p>
			</MyButton>
		</form>
	)
}

export default EmployeesEdit
