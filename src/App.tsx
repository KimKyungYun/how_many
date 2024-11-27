import { Route, Routes } from "react-router-dom";
import HowMany from "./pages/HowMany";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path='/' element={ <HowMany/>} />
			</Route>
		</Routes>
	)
}

export default App;
