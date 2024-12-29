import styles from './SideBar.module.scss'
import { Building, MailPlus, Users } from 'lucide-react'
import NavMenu from '../Nav/NavMenu.tsx'
import Logo from '../Logo/Logo.tsx'

const SideBar = () => {
	const sidebarNavItems = [
		{
			route: '/users',
			icon: <Users />,
			label: 'Users list'
		},
		{
			route: '/letter',
			icon: <MailPlus />,
			label: 'Add letter'
		},
		{
			route: '/department',
			icon: <Building />,
			label: 'Departments'
		}
	]

	return (
		<aside className={styles.sidebar}>
			<Logo />
			<NavMenu sidebarNavItems={sidebarNavItems} />
		</aside>
	)
}

export default SideBar
