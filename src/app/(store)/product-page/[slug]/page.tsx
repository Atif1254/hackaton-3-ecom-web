'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { client } from '../../../../sanity/lib/client'; // Ensure this path is correct for your setup
import { notFound } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stockLevel: number;
  imageUrl: string;
}

// The fetch function now properly handles missing product data.
async function fetchProductData(slug: string): Promise<Product | null> {
  const productQuery = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    description,
    price,
    discountPercentage,
    stockLevel,
    "imageUrl": image.asset->url
  }`;

  try {
    const product = await client.fetch(productQuery, { slug });
    return product || null;  // Return null if no product found
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Component for the product page with error handling
const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch product data when component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await fetchProductData(params.slug);
      if (!fetchedProduct) {
        notFound(); // Redirect to 404 if product is not found
      } else {
        setProduct(fetchedProduct);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
};

// ProductDetails component
const ProductDetails = ({ product }: { product: Product }) => {
  const discountedPrice =
    product.discountPercentage && product.discountPercentage > 0
      ? (product.price * (100 - product.discountPercentage)) / 100
      : null;

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < product.stockLevel) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row m-auto mt-[100px] px-4 md:w-[1100px] mb-[100px]">
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={550}
        className="rounded-lg shadow-md"
      />

      {/* Product Details */}
      <div className="flex flex-col w-full md:w-[300px] h-[350px] md:ml-[100px] justify-around text-left mt-6 md:mt-0">
        <h1 className="text-lg md:text-3xl font-bold mb-4">{product.name}</h1>

        <div className="my-4">
          {discountedPrice ? (
            <>
              <p className="text-gray-400 line-through">${product.price} USD</p>
              <p className="text-lg font-bold text-[#029fae]">
                ${discountedPrice.toFixed(2)} USD
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-[#029fae]">
              ${product.price} USD
            </p>
          )}
        </div>

        <p className="text-gray-500 mb-4">
          {product.stockLevel > 0 ? (
            <span>In Stock: {product.stockLevel}</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={incrementQuantity}
            disabled={quantity >= product.stockLevel}
          >
            +
          </button>
        </div>

        <button
          className="text-sm w-[130px] h-[40px] bg-[#029fae] text-white rounded-md snipcart-add-item"
          data-item-id={product._id}
          data-item-name={product.name}
          data-item-price={discountedPrice || product.price}
          data-item-url={`/product/${product._id}`}
          data-item-image={product.imageUrl}
          data-item-description={product.description}
          data-item-quantity={quantity}
        >
          <i className="bi bi-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
