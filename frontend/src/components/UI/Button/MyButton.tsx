import styles from './MyButton.module.scss'
import React, { FC, JSX } from 'react'
import { MyButtonProps } from './MyButton.props.ts'

const MyButton: FC<MyButtonProps> = React.forwardRef(
	({ children, ...props }, ref): JSX.Element => {
		const defaultStyles = `${styles.button}`
		return (
			<button
				ref={ref}
				className={defaultStyles}
				{...props}
			>
				{children}
			</button>
		)
	}
)

export default MyButton
