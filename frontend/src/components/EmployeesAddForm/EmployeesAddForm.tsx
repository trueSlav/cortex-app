import {useEffect, useRef, useState} from 'react'
import styles from './EmployeesAddForm.module.scss'
import MyButton from '../UI/Button/MyButton.tsx'
import { UserPlus } from 'lucide-react'
import MyInput from '../UI/MyInput/MyInput.tsx'
import apiFetch from '../../api/apiFetch.ts'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {formattedDate} from "../../helpers/formattedDate.ts";

interface IFormInput {
	firstName: string,
	lastName: string,
	middleName: string,
	position: string,
	hireDate: Date | string,
}

const EmployeesAddForm = ({setUsers}) => {
	const [departments, setDepartments] = useState([])

	const { register, handleSubmit, control, formState } = useForm<IFormInput>({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			middleName: '',
	 		hireDate: formattedDate,
		},
	})

	const errors = {
		firstName : formState.errors['firstName']?.message,
		lastName : formState.errors['lastName']?.message,
		middleName : formState.errors['middleName']?.message,
	}

	useEffect(() => {
		fetchDepartments()
	}, [])

	const fetchDepartments = async () => {
		const response = await apiFetch('get', '/departments')
		setDepartments(response)
	}

	const onSubmit:SubmitHandler<IFormInput> = async (data) => {
		const response = await apiFetch('post', '/users', data)
		setUsers(response)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>

			<Controller
				name='firstName'
				control={control}
				rules={{
					required: 'is required',
					maxLength: 20,
					minLength: 1,
					pattern: { value: /^[A-Za-z]+$/i, message: 'Enter correct value name' }
				}}
				render={({field} ) => (
					<MyInput
						id={'name'}
						type='text'
						placeholder='Valeriy'
						{...field}
					>
						{errors.firstName && <p style={{color:'tomato'}}>{errors.firstName}</p>}
						<span>Enter name</span>
					</MyInput>
				)}
			/>

			<Controller
				name='lastName'
				control={control}
				rules={{
					required: 'is required',
					maxLength: 20,
					minLength: 1,
					pattern: { value: /^[A-Za-z]+$/i, message: 'Enter correct value surname' }
				}}
				render={({field} ) => (
					<MyInput
				id={'surname'}
						type='text'
						placeholder='Jmishenko'
						{...field}
					>
						{errors.lastName && <p style={{color:'tomato'}}>{errors.lastName}</p>}
						<span>Enter surname</span>
					</MyInput>
				)}
			/>

			<Controller
				name='middleName'
				control={control}
				rules={{
					maxLength: 20,
					pattern: { value: /^[A-Za-z]+$/i, message: 'Enter correct value middlename' }
				}}
				render={({field} ) => (
					<MyInput
				id={'patronymic'}
						type='text'
						placeholder='Albertovich'
						{...field}
					>
						{errors.middleName && <p style={{color:'tomato'}}>{errors.middleName}</p>}
						<span>Enter patronymic</span>
					</MyInput>
				)}
			/>

			<Controller
				name='hireDate'
				control={control}
				rules={{
					valueAsDate: true,
				}}
				render={({field} ) => (
					<MyInput
						id={'date'}
						type='date'
						{...field}
					>
						<span>Enter hire date</span>
					</MyInput>
				)}
			/>

			<select
				{...register('position')}
				className={styles.select}
				style={{ color: '#ffcc14' }}
			>
				<option value=''>Select department</option>
				{departments.map(department => (
					<option
						style={{ color: '#ffcc14', backgroundColor: 'inherit' }}
						key={department.id}
						value={department.dep_name}
					>
						{department.dep_name}
					</option>
				))}
			</select>

			<MyButton type='submit'>
				<UserPlus />
				<p>New user</p>
			</MyButton>
		</form>
	)
}

export default EmployeesAddForm
