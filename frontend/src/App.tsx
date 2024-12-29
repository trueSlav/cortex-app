import { Route, Routes } from 'react-router'
import { lazy } from 'react'
import Layout from './components/Layout/Layout.tsx'

const EmployeesList = lazy(
	() => import('./components/EmployeesList/EmployeesList.tsx')
)
const Letter = lazy(() => import('./pages/Letter/Letter.tsx'))
const Departments = lazy(() => import('./pages/Departments/Departments.tsx'))
const DepartmentsAddForm = lazy(
	() => import('./components/DepartmentsAddForm/DepartmentsAddForm.tsx')
)
const DepartmentsEdit = lazy(
	() => import('./components/DepartmentsEdit/DepartmentsEdit.tsx')
)
const EmployeesEdit = lazy(
	() => import('./components/EmployeesEdit/EmployeesEdit.tsx')
)

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				<Route
					index
					path='/'
					element={<EmployeesList />}
				/>

				<Route
					path='users'
					element={<EmployeesList />}
				/>

				<Route
					path='users/edit/:id'
					element={<EmployeesEdit />}
				/>

				<Route
					path='department'
					element={<Departments />}
				></Route>
				<Route
					path='department/new'
					element={<DepartmentsAddForm />}
				/>
				<Route
					path='department/edit/:id'
					element={<DepartmentsEdit />}
				/>

				<Route
					path='letter'
					element={<Letter />}
				></Route>
				<Route
					path='letter/:id'
					element={<Letter />}
				/>
			</Route>
		</Routes>
	)
}

export default App
