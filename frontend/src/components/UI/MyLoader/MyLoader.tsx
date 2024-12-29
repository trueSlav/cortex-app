import styles from './MyLoader.module.scss'
import {LoaderCircle} from "lucide-react";
import {JSX} from "react";

const MyLoader = (): JSX.Element => {
	return (
		<>
			<LoaderCircle className={styles.loader}/>
		</>
	);
};

export default MyLoader;