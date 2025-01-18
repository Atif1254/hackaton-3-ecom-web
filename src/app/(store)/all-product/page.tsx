"use client";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  slug: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        "slug": slug.current
      }`;

      const fetchedProducts = await client.fetch(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="m-auto w-full max-w-[1100px] mt-[150px] md:mb-[200px] mb-[100px] px-4">
        <div className="text-lg md:text-3xl text-left mb-10 font-bold">All Products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id}>
              <Image
                className="rounded-sm"
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                width={250}
                height={250}
              />
              <p className="mt-2 text-[#029fae]">{product.name}</p>
              <div className="flex justify-between items-center mb-2">
                <p>${product.price}</p>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
