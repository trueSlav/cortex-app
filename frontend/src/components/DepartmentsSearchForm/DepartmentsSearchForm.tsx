import MyInput from "../UI/MyInput/MyInput.tsx";

const DepartmentsSearchForm = ({ filterDepartments }) => {
	return (
		<div>
			<form>
				<MyInput
					type={'text'}
					name={'positions-add-form'}
					placeholder='Department'
					onChange={e => filterDepartments(e)}
				>
					<span>search department</span>
				</MyInput>
			</form>
		</div>
	)
}

export default DepartmentsSearchForm
