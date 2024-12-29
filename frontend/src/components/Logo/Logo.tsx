import styles from './Logo.module.scss'

const Logo = () => {
	return (
		<div className={styles.logo}>
			My<span>app</span> for <span className={styles.cortex}>Cortex</span>
		</div>
	)
}

export default Logo
