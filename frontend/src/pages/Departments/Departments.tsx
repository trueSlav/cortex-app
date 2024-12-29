import styles from './Departments.module.scss'
import DepartmentsList from '../../components/DepartmentsList/DepartmentsList.tsx'

const Departments = () => {
	return (
		<div className={styles.departments}>
			<h2 className={styles.title}>Departments page</h2>
			<DepartmentsList />
		</div>
	)
}

export default Departments
