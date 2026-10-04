import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateProduct = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });

    const [image, setImage] = useState(null);

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

            await api.post("/products", formData);

            alert("Product created successfully");

            navigate("/products");
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Product creation failed"
            );
        }
    };

    return (
        <div className="form-container">
            <form
                onSubmit={handleSubmit}
                className="form"
            >
                <h1>Add Product</h1>

                <input
                    name="name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    placeholder="Category"
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
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;