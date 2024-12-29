import styles from './NavMenu.module.scss'
import NavElement from './NavElement.tsx'
import React, { FC } from 'react'

interface INavItems {
	route: string
	icon: React.ReactNode
	label: string
}

interface IProps {
	sidebarNavItems: INavItems[]
}

const NavMenu: FC<IProps> = ({ sidebarNavItems }) => {
	return (
		<nav>
			<ul className={styles.list}>
				{sidebarNavItems.map((item, i) => (
					<NavElement
						route={item.route}
						icon={item.icon}
						label={item.label}
						key={i}
					/>
				))}
			</ul>
		</nav>
	)
}

export default NavMenu
