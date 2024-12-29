import styles from './DepartmentsList.module.scss'
import { useEffect, useState } from 'react'
import apiFetch from '../../api/apiFetch.ts'
import DepartmentsSearchForm from '../DepartmentsSearchForm/DepartmentsSearchForm.tsx'
import DepartmentsListItem from "../DepartmentsListItem/DepartmentsListItem.tsx";
import MyButton from "../UI/Button/MyButton.tsx";
import {Link} from "react-router";

const DepartmentsList = () => {
	const [departments, setDepartments] = useState([])
	const [departmentsFilter, setDepartmentsFilter] = useState([])

	useEffect(() => {
		getDepartmentsList()
	}, [])

	const getDepartmentsList = async () => {
		const response = await apiFetch('get', '/departments')
		setDepartments(response)
		setDepartmentsFilter(response)
	}

	const onDeleteDepartment = async (id) => {
		const data = departmentsFilter.filter(deps => deps.id !== id)
		setDepartmentsFilter(data)
	}

	const handleDelete = async (e, id) => {
		e.preventDefault()
		const confirm = window.confirm(
			'Are you sure you want to delete this department?'
		)
		if (confirm) {
			onDeleteDepartment(id)
			await apiFetch('delete', `/departments/${id}`)
		}
	}

	const filterDepartments = e => {
		const filtredDepartments = departments.filter(dep =>
			dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setDepartmentsFilter(filtredDepartments)
	}

	return (
		<>
				<div className={styles.list}>
					<ul>
						{departmentsFilter.map((department, index) => (
							<DepartmentsListItem
								key={index}
								id={department.id}
								index={index}
								name={department.dep_name}
								description={department.dep_descr}
								handleDelete={handleDelete}
							/>
						))}
					</ul>
					<div className={styles.buttonBlock}>
						<DepartmentsSearchForm filterDepartments={filterDepartments}/>
						<MyButton type='button'>
							<Link to='/department/new'>add department</Link>
						</MyButton>
					</div>
				</div>
		</>
	)
}

export default DepartmentsList
