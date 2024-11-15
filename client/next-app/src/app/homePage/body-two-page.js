'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BodyTwoPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProduct(data[0]);
      console.log(data[0].image_medium);
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.list_price}</p>
      <p>Available Quantity: {product.qty_available}</p>
      {product.image_medium && (
        <img src={`http://localhost:8069/web/image?model=product.product&id=${product.id}&field=image_medium`} alt="Description of image" />
      )}
    </div>
  );
}
