import departmentServices from '../../api/apiFetch.ts'
import { useEffect, useState } from 'react'
import MyInput from '../../components/UI/MyInput/MyInput.tsx'
import MyButton from '../../components/UI/Button/MyButton.tsx'
import {LoaderCircle, SendHorizonal} from 'lucide-react'
import {Link, useParams} from 'react-router'
import styles from './Letter.module.scss'
import MyLoader from "../../components/UI/MyLoader/MyLoader.tsx";

const Letter = () => {
	const [letter, setLetter] = useState('')
	const [user, setUser] = useState([])
	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		fetchUser()
	}, [])

	const fetchUser = async () => {
		const response = await departmentServices('get', `/users/edit/${id}`)
		console.log(response)
		setUser(response[0])
	}

	const handleSubmit = async () => {
		const value = `анонимное новое поздравление с днем рождения для ${user.first_name} ${user.last_name}`
		setLoading(true)
		const response = await departmentServices('post', '/letter', {
			value
		})
		setLetter(response)
		setValue('')
		setLoading(false)
	}

	let title:string = '';
	// const linkToEmployeesList = <Link to='/users'>списка сотрудников</Link>
	if (user.first_name && user.last_name) {
		title = `Поздравление с днем рождения для ${user.first_name} ${user.last_name}`
	} else {
		title = `Выберите получателя из списка сотрудников`
	}

	return (
		<div className={styles.main} >
			<p className={styles.title}>{title}</p>
			<MyButton onClick={handleSubmit}>
				Создать поздравление
				<SendHorizonal />
			</MyButton>
			{loading
			 ?
			 	<MyLoader/>
			 :
			 	<span className={styles.text}>
					<pre>{letter}</pre>
				</span>
			}
		</div>
	)
}

export default Letter
