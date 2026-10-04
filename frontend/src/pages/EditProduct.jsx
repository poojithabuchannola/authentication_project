import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(
                    `/products/${id}`
                );

                const product = response.data.product;

                setForm({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.category
                });
            } catch (error) {
                console.log(error);
            }
        };

        getProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append(
                "description",
                form.description
            );
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            formData.append("category", form.category);

            if (image) {
                formData.append("image", image);
            }

            await api.put(
                `/products/${id}`,
                formData
            );

            alert("Product updated successfully");

            navigate("/products");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Update failed"
            );
        }
    };

    return (
        <div className="form-container">
            <form
                onSubmit={handleSubmit}
                className="form"
            >
                <h1>Edit Product</h1>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <button type="submit">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;