import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ name: '', price: '' });

    // Lấy danh sách sản phẩm
    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    // Cập nhật form
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Gửi dữ liệu POST
    const handleSubmit = (e) => {
        e.preventDefault();

        const productToSend = {
            name: product.name,
            price: parseFloat(product.price)
        };

        axios.post('http://localhost:8080/api/products', productToSend)
            .then(res => {
                alert('✅ Thêm thành công');
                setProduct({ name: '', price: '' });
                setProducts([...products, res.data]); // thêm vào danh sách luôn
            })
            .catch(err => {
                console.error(err);
                alert('❌ Lỗi khi thêm sản phẩm');
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} - {p.price}₫</li>
                ))}
            </ul>

            <hr style={{ margin: '30px 0' }} />

            <h3>Thêm sản phẩm mới</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Tên: </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Giá: </label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Thêm</button>
            </form>
        </div>
    );
}
export default App;
