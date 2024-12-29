import { NavLink } from 'react-router'
import styles from './NavElement.module.scss'
import React, { FC } from 'react'

interface IProps {
	route: string
	icon: React.ReactNode
	label: string
}

const NavElement: FC<IProps> = ({ route, icon, label }) => {
	const active = `${styles.link} ${styles.active}`
	const setActive = ({ isActive }) => (isActive ? active : styles.link)
	return (
		<li className={styles.navElement}>
			<NavLink
				className={setActive}
				to={route}
			>
				<p className={styles.innerWrapper}>
					{icon}
					<span>{label}</span>
				</p>
			</NavLink>
		</li>
	)
}

export default NavElement
