import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await api.get("/products");

            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);

            setProducts(
                products.filter(
                    (product) => product._id !== id
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="products-container">
            <h1>Products</h1>

            <Link to="/products/create">
                <button>Add Product</button>
            </Link>

            <div className="product-grid">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product._id}
                    >
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                            />
                        )}

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <p>
                            ₹{product.price}
                        </p>

                        <p>
                            Stock: {product.stock}
                        </p>

                        <p>
                            Category: {product.category}
                        </p>

                        <div>
                            <Link
                                to={`/products/edit/${product._id}`}
                            >
                                <button>
                                    Edit
                                </button>
                            </Link>

                            <button
                                onClick={() =>
                                    deleteProduct(product._id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;