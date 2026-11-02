import { Route, Routes } from "react-router";
import Auth from "./pages/auth";
import Register from "./pages/register/registers";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashbord/Dashboard";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Auth />} />
			<Route path="/register" element={<Register />} />
			<Route path='/' element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
}

export default App;
