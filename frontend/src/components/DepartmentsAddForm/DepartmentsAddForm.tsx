import {FormEvent, useState} from 'react'
import { useNavigate } from 'react-router'
import apiFetch from "../../api/apiFetch.ts";
import styles from "../DepartmentsEdit/DepartmentsEdit.module.scss";
import MyInput from "../UI/MyInput/MyInput.tsx";
import MyButton from "../UI/Button/MyButton.tsx";

const DepartmentsAddForm = () => {
	const navigate = useNavigate()
	const [department, setDepartment] = useState({
		dep_name: '',
		dep_descr: ''
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await apiFetch('post', '/departments', department)
		setDepartment(response)
		navigate('/department')
	}

	return (
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<div>
					<MyInput
						onChange={(e) =>
							setDepartment({...department, dep_name: e.target.value})
						}
						name='dep_name'
						id='dep_name'
						type='text'
						defaultValue={department.dep_name}
						placeholder='Department name'
					>
						<span>Enter the name of the new department</span>
					</MyInput>
					<MyInput
						onChange={e =>
							setDepartment({...department, dep_descr: e.target.value})
						}
						defaultValue={department.dep_descr}
						type={'text'}
						name={'dep_descr'}
						id='dep_descr'
						placeholder='Department description'
					>
						<span>Change description</span>
					</MyInput>
				</div>
				<MyButton type='submit'><span>add new department</span></MyButton>
			</form>
)
}

export default DepartmentsAddForm
