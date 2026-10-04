import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/products" className="logo">
                Product App
            </Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <span>Hello, {user.name}</span>

                        <Link to="/products">
                            Products
                        </Link>

                        <Link to="/products/create">
                            Add Product
                        </Link>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;