'use client';

import { useEffect, useState } from 'react';
import { client } from '../../../sanity/lib/client';
import Image from 'next/image';

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
      const query = `*[_type == "product"][0..7] {
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
    <div className="mx-auto my-48 max-w-lg md:max-w-7xl ">
      <div className="text-lg md:text-3xl text-center mb-10 font-bold">
        Our Products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product._id} className="m-auto">
            <a href={`/product-page/${product.slug}`}>
              <Image
                src={product.imageUrl || '/placeholder.png'}
                alt={product.name}
                width={250}
                height={250}
              />
            </a>
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
            <div>
              <button
                className="text-sm w-[130px] h-[40px] bg-[#029fae] text-white rounded-md snipcart-add-item"
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
