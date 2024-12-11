import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import EmpList from "./components/EmpList/EmpList.tsx";
import Letter from "./pages/Letter.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<EmpList />} />
				<Route path="/letter" element={<Letter />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
