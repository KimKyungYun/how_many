import { Route, Routes } from "react-router-dom";
import HowMany from "./pages/HowMany";
import DefaultLayout from "./layout/DefaultLayout";
import { Analytics } from "@vercel/analytics/react";
function App() {
	return (
		<>
		<Analytics />
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path='/' element={ <HowMany/>} />
			</Route>
		</Routes>
		</>
	)
}

export default App;
