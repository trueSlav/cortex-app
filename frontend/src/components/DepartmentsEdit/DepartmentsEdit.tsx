import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import apiFetch from '../../api/apiFetch.ts'
import MyButton from "../UI/Button/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";
import styles from './DepartmentsEdit.module.scss'
import MyLoader from "../UI/MyLoader/MyLoader.tsx";

const DepartmentsEdit = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState<boolean>(true)
	const [department, setDepartment] = useState<number[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		fetchDepartments()
	}, [])

	const fetchDepartments = async () => {
		const response = await apiFetch('get', `/departments/${id}`)
		setDepartment(response[0])
		setLoading(false)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		await apiFetch('put', `/departments/${id}`, department)
		navigate('/department')
	}

	return (
		<>
			{loading ?
			 <MyLoader/>
							 :
			 <form
				 onSubmit={handleSubmit}
				 className={styles.form}
			 >
				 <div>
					 <MyInput
						 onChange={e =>
							 setDepartment({...department, dep_name: e.target.value})
						 }
						 name='dep_name'
						 id='dep_name'
						 type='text'
						 defaultValue={department.dep_name}
					 >
						 <span>Change name department</span>
					 </MyInput>
					 <MyInput
						 onChange={e =>
							 setDepartment({...department, dep_descr: e.target.value})
						 }
						 defaultValue={department.dep_descr}
						 type={'text'}
						 name={'dep_descr'}
						 id='dep_descr'
					 >
						 <span>Change description</span>
					 </MyInput>
				 </div>
				 <MyButton type='submit'><span>edit department</span></MyButton>
			 </form>
			}
		</>
	)
}

export default DepartmentsEdit
