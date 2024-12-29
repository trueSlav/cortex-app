import {Outlet} from 'react-router'
import SideBar from '../SideBar/SideBar.tsx'
import styles from './Layout.module.scss'
import MyLoader from "../UI/MyLoader/MyLoader.tsx";
import {Suspense} from "react";

const Layout = () => {
	return (
		<div className={styles.page}>
			<SideBar />
			<main className={styles.main}>
				<Suspense fallback={<MyLoader/>}><Outlet /></Suspense>
			</main>
		</div>
	)
}

export default Layout