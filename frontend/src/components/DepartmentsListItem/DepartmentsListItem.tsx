import styles from './DepartmentsListItem.module.scss'
import MyButton from "../UI/Button/MyButton.tsx";
import {Pencil, Trash} from "lucide-react";
import {useNavigate} from "react-router";
import {FC} from "react";

interface DepartmentsListItemProps {
	id: number,
	index: number,
	name: string,
	description: string,
	handleDelete: () => void,
}

const DepartmentsListItem:FC<DepartmentsListItemProps> = ({id, index, name, description, handleDelete}) => {
	const navigate = useNavigate();

	return (
		<li>
			<article className={styles.article}>
				<div>
					<span>{index + 1}. </span>
					{name} - {description}
				</div>
				<div className={styles.buttonBlock}>
					<span className={styles.icon}>
						<MyButton
							onClick={() => {
								navigate(`/department/edit/${id}`)
							}}
						>
							<Pencil/>
						</MyButton>
					</span>
					<span className={styles.icon}>
						<MyButton
							onClick={e => {
								handleDelete(e, id)
							}}
						>
							<Trash/>
						</MyButton>
					</span>
				</div>
			</article>
		</li>
	);
};

export default DepartmentsListItem;