import {InputHTMLAttributes, LegacyRef, ReactElement, ReactNode} from "react";

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string
	defaultValue?: string
	children?: ReactElement | ReactNode
	ref?: LegacyRef<HTMLInputElement>
}