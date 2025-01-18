'use client'
import { useEffect, useState } from 'react';
import { client } from '../../../sanity/lib/client';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  slug: string;
  imageUrl: string;
  discountPercentage: number;
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const query = `*[_type == "product"][0..3] {
        _id,
        name,
        price,
        description,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        discountPercentage
      }`;

      const products = await client.fetch(query);
      setFeaturedProducts(products);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="mt-5 gap-5 mb-10 md:w-[1100px] sm:w-full m-auto">
      <div className="text-xl md:text-3xl font-bold">
        <h1>Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {featuredProducts.map((product) => (
          <div key={product._id} className="m-auto">
            <a href={`/product-page/${product.slug}`}>
              <Image
                src={product.imageUrl || '/placeholder.png'}
                alt={product.name}
                width={250}
                height={250}
              />
            </a>
            <div className="flex justify-between items-end mt-2">
              <div className="flex flex-col gap-2">
                <div className="text-[#029fae]">{product.name}</div>
                <div className="flex gap-3 items-center">
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
              <div className='mx-5'>
                <button
                  className="mt-5 text-sm w-[130px] h-[40px] bg-[#029fae] text-white rounded-md snipcart-add-item"
                  data-item-id={product._id}
                  data-item-name={product.name}
                  data-item-price={product.price}
                  data-item-url={`/product-page/${product.slug}`}
                  data-item-image={product.imageUrl}
                  data-item-description={product.description}
                >
                  <i className="bi bi-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
