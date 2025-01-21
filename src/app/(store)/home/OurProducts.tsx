'use client';

import { useEffect, useState } from 'react';
import { client } from '../../../sanity/lib/client';
import Image from 'next/image';
import WishlistButton from '../wishlist/WishlistButton';
import Link from 'next/link';

// Define the Product interface
type Product = {
  _id: string;
  name: string;
  price: string;
  description: string;
  slug: string;
  imageUrl: string;
  discountPercentage: number;
  stockLevel: number;
  category: string;
  isFeaturedProduct: boolean;
};

const OurProducts = () => {
  // Use the defined Product interface instead of `any[]`
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"][0..8] {
        _id,
        name,
        price,
        description,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        discountPercentage,
        stockLevel,
        category,
        isFeaturedProduct
      }`;

      const fetchedProducts: Product[] = await client.fetch(query); // Specify the type here
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto my-48 w-full max-w-sm sm:max-w-lg md:max-w-5xl lg:max-w-7xl ">
      {/* Heading */}
      <div className="text-center lg:text-left lg:ml-[10%] text-4xl md:text-5xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-black bg-clip-text text-transparent">
        Our Products
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <div key={product._id} className="m-auto transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-50 hover:rounded-lg my-10">
            <Link href={`/product-page/${product.slug}`}>
              <Image
              className='hover:scale-105 overflow-hidden relative object-cover'
                src={product.imageUrl || '/placeholder.png'}
                alt={product.name}
                width={250}
                height={250}
              />
            </Link>
            <div className="flex flex-col my-4">
              <div className="text-[#029fae]">{product.name}</div>
              <div className="flex my-2 items-center gap-5">
                <div>${product.price}</div>
                {product.discountPercentage > 0 && (
                  <div className="text-gray-400 line-through text-sm">
                    ${(
                      parseFloat(product.price) +
                      parseFloat(product.price) * (product.discountPercentage / 100)
                    ).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            {/* Ratings */}
            <div className='flex mb-3'>
              <img width="20" height="20" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
              <img width="20" height="20" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
              <img width="20" height="20" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
              <img width="20" height="20" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
              <img width="20" height="20" src="https://img.icons8.com/emoji/48/star-emoji.png" alt="star-emoji"/>
            </div>

            {/* Wishlist Button */}
            <div className='mb-5'>
              <WishlistButton productId={product._id} /> {/* Add WishlistButton here */}
            </div>

            <div>
              <button
                className="text-sm w-full max-w-64 h-[40px] bg-[#029fae] text-white 
                rounded-md snipcart-add-item  font-semibold  bg-gradient-to-b from-[#029fae] 
                to-teal-600 shadow:sm transform transition-all duration-300 hover:scale-105"
                data-item-id={product._id}
                data-item-name={product.name}
                data-item-price={product.price}
                data-item-url={`/product-page/${product.slug}`} // Updated to use slug for the product URL
                data-item-image={product.imageUrl}
                data-item-description={product.description}
              >
                <i className="bi bi-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
