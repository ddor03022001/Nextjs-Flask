'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import logo from "../picture/logo.png";
import "./body-one-page.scss";

export default function BodyOnePage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * productsPerPage;
    const selectedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    if (!products.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-body-one-page">
            <div className='search-body-one-page'>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <div className="product-list">
                {selectedProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <div className="text">{product.name}</div>
                        <img
                            className="image"
                            src={product.image_medium ? `data:image/jpeg;base64,${product.image_medium}` : logo}
                            alt={product.name}
                        />
                    </div>
                ))}
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={startIndex + productsPerPage >= filteredProducts.length}>Next</button>
            </div>
        </div>
    );
}
