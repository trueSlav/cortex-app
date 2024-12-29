import EmployeesListItem from '../EmployeesListItem/EmployeesListItem.tsx'
import EmployeesAddForm from '../EmployeesAddForm/EmployeesAddForm.tsx'
import styles from './EmployeesList.module.scss'
import apiFetch from '../../api/apiFetch.ts'
import { useFetch } from '../../helpers/hook/useFetch.ts'
import MyLoader from '../UI/MyLoader/MyLoader.tsx'

const EmployeesList = () => {
	const { data, isLoading, setData } = useFetch(apiFetch('get', '/get-users'))

	const onDeleteUsers = async (id: string) => {
		const res = data.filter(user => user.id !== id)
		setData(res)
	}

	const handleDelete = async (e, id, ...name) => {
		e.preventDefault()
		const confirm = window.confirm(
			`Are you sure you want to delete user : ${name[0]} ${name[1]}?`
		)
		if (confirm) {
			await apiFetch('delete', `/users/${id}`)
			onDeleteUsers(id)
		}
	}

	return (
		<div className={styles.list}>
			<h2 className={styles.title}>Employees list</h2>
			<ul>
				{isLoading ? (
					<MyLoader />
				) : (
					<EmployeesListItem
						handleDelete={handleDelete}
						users={data}
					/>
				)}
			</ul>
			<EmployeesAddForm setUsers={setData} />
		</div>
	)
}

export default EmployeesList
