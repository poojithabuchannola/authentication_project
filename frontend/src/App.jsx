import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<h1>Home Page</h1>}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<h1>Login Page</h1>}
                />

                <Route
                    path="/products"
                    element={<h1>Products Page</h1>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;