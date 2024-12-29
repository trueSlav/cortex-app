import styles from './EmployeesListItem.module.scss'
import { IUser } from '../../types/types'
import { FC } from 'react'
import MyButton from '../UI/Button/MyButton.tsx'
import { Mail, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

interface UserItemProps {
	users: IUser[]
	handleDelete: (event: Event) => void
}

const EmployeesListItem: FC<UserItemProps> = ({ users, handleDelete }) => {
	const navigate = useNavigate()

	return (
		<>
			{users?.map((user, index) => (
				<li key={user.id}>
					<article className={styles.article}>
						<div>
							<span>{index + 1}.</span> {user.first_name} {user.last_name}{' '}
							{user.middle_name} {user.position}{' '}
							{new Date(user.hire_date).toLocaleDateString()}
						</div>
						<div className={styles.buttonBlock}>
							<span className={styles.icon}>
								<MyButton
									onClick={() => navigate(`/letter/${user.id}`)}
									type={'submit'}
								>
									<Mail />
								</MyButton>
							</span>

							<span className={styles.icon}>
								<MyButton
									onClick={() => navigate(`/users/edit/${user.id}`)}
									type={'submit'}
								>
									<Pencil />
								</MyButton>
							</span>

							<span className={styles.icon}>
								<MyButton
									onClick={e =>
										handleDelete(e, user.id, user.first_name, user.last_name)
									}
									type={'submit'}
								>
									<Trash2 />
								</MyButton>
							</span>
						</div>
					</article>
				</li>
			))}
		</>
	)
}

export default EmployeesListItem
