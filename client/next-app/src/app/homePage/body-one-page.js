'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import logo from "../picture/logo.png";
import "./body-one-page.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function BodyOnePage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // Quản lý sản phẩm đang được chọn
    const [hideOutOfStock, setHideOutOfStock] = useState(false); // Quản lý trạng thái checkbox
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

    const handleCheckboxChange = () => {
        setHideOutOfStock(!hideOutOfStock); // Đổi trạng thái checkbox
        setCurrentPage(1); // Reset trang hiện tại về 1
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product); // Hiển thị popup với sản phẩm được chọn
    };

    const handleClosePopup = () => {
        setSelectedProduct(null); // Đóng popup
    };

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm và trạng thái checkbox
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!hideOutOfStock || product.qty_available >= 1)
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
                <button className='back-button' onClick={handlePreviousPage} disabled={currentPage === 1}><i className="fa-solid fa-chevron-left"></i></button>
                <button className='next-button' onClick={handleNextPage} disabled={startIndex + productsPerPage >= filteredProducts.length}><i className="fa-solid fa-chevron-right"></i></button>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="hideOutOfStock"
                        checked={hideOutOfStock}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="hideOutOfStock">Ẩn sản phẩm hết hàng</label>
                </div>
            </div>
            <div className="product-list">
                {selectedProducts.map((product) => (
                    <div key={product.id} className="product-item" onClick={() => product.qty_available >= 1 && handleProductClick(product)}>
                        <div className="text">{product.name}</div>
                        {product.qty_available < 1 && (
                            <div className="out-of-stock-overlay">
                                Hết hàng
                            </div>
                        )}
                        <img
                            className="image"
                            src={product.image_medium ? `data:image/jpeg;base64,${product.image_medium}` : logo}
                            alt={product.name}
                        />
                    </div>
                ))}
            </div>

            {/* Hiển thị popup chi tiết sản phẩm nếu có sản phẩm được chọn */}
            {selectedProduct && (
                <div className="product-popup">
                    <div className="popup-content">
                        <button className="close-popup" onClick={handleClosePopup}>X</button>
                        <h2>{selectedProduct.name}</h2>
                        <img
                            src={selectedProduct.image_medium ? `data:image/jpeg;base64,${selectedProduct.image_medium}` : logo}
                            alt={selectedProduct.name}
                            className="popup-image"
                        />
                        <p>Giá: {selectedProduct.list_price.toLocaleString('vi-VN')}  đ</p>
                        <button className="add-to-cart"><i className="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
            )}
        </div>
    );
}
