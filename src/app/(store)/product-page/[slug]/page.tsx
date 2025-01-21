'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '../../../../sanity/lib/client'; 
import { notFound } from 'next/navigation';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import RecommendationSection from './Recommendation';
import WishlistButton from '../../wishlist/WishlistButton';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stockLevel: number;
  imageUrl: string;
}

// Fetch product data from Sanity
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
    return product || null; // Return null if no product is found
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

// Product page component
const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
    <>
    <div className="flex flex-col justify-center md:flex-row m-auto my-[100px] w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-7xl">
      {/* Product Image */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={550}
        className="rounded-lg shadow-sm hover:scale-110 overflow-hidden relative object-cover transition-all duration-200"
      />

      {/* Product Details */}
      <div className="flex flex-col w-full md:w-[300px] h-[350px] md:ml-[100px] justify-around text-left mt-6 md:mt-0">
        {/* Title */}
        <h1 className="text-lg md:text-3xl font-bold mb-4">{product.name}</h1>

        {/* Pricing */}
        <div className="my-4 gap-5">
          {discountedPrice ? (
            <>
              <p className="text-gray-400 line-through mb-2">${product.price}</p>
              <p className="text-lg font-bold text-[#029fae] mb-2">
                ${discountedPrice.toFixed(2)} USD
              </p>
              <p className="text-black font-semibold">
                ({product.discountPercentage}% OFF)
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-[#029fae]">
              ${product.price} USD
            </p>
          )}
        </div>

        {/* Wishlist Button */}
        <div>
          <WishlistButton productId={product._id} /> {/* Add WishlistButton here */}
        </div>

        {/* Express Shipping */}
        <div className="flex items-center my-5">
           <Switch id="Express Shipping" className='mr-5'/>
           <Label htmlFor="Express-Shipping">Express Shipping <span className='text-gray-600'> (Charge's $50 Extra!) </span></Label>
        </div>

        {/* Ratings */}
        <div className="flex mb-2">
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/star-emoji.png"
            alt="star-emoji"
          />
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/star-emoji.png"
            alt="star-emoji"
          />
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/star-emoji.png"
            alt="star-emoji"
          />
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/star-emoji.png"
            alt="star-emoji"
          />
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/emoji/48/star-emoji.png"
            alt="star-emoji"
          />
        </div>

        {/* Stock Level */}
        <p className="text-gray-500 my-2">
          {product.stockLevel > 0 ? (
            <span>In Stock: {product.stockLevel}</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </p>

        {/* Quantity Controls */}
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

        {/* Add to Cart Button */}
        <button
          className="text-sm w-full max-w-64 h-[40px] bg-[#029fae] text-white 
                rounded-md snipcart-add-item  font-semibold  bg-gradient-to-b from-[#029fae] 
                to-teal-600 shadow:sm transform transition-all duration-300 hover:scale-105"
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
    {/*  Recommendation Section */}
    <div className='my-10'>
      <RecommendationSection />
    </div>
    </>
  );
};

export default ProductPage;
