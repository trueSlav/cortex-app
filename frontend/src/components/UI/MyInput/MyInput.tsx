import React, { FC, JSX } from 'react'
import styles from './MyInput.module.scss'
import { MyInputProps } from './MyInput.props.ts'

const MyInput: FC<MyInputProps> = React.forwardRef(
	({ children, id, ...props }, ref): JSX.Element => {
		return (
			<label
				className={styles.label}
				htmlFor={id}
			>
				{children}
				<input
					className={styles.input}
					ref={ref}
					id={id}
					{...props}
				/>
			</label>
		)
	}
)

export default MyInput
