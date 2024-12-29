import {ButtonHTMLAttributes, LegacyRef, ReactElement, ReactNode} from "react";

export interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	children: ReactElement | ReactNode,
	ref?: LegacyRef<HTMLButtonElement>
}