"use client";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  slug: string;
  discountPercentage?: number;
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
        "slug": slug.current,
        discountPercentage
      }`;

      const fetchedProducts = await client.fetch(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-sm w-full sm:max-w-lg md:max-w-2xl lg:max-w-6xl my-20 border-t-[1px] border-gray-300/50 px-4">
        {/* Filter */}
        <div className="max-w-48 ml-80% my-10">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Price Low to High">
                Price Low to High
              </SelectItem>
              <SelectItem value="Price High to Low">
                Price High to Low
              </SelectItem>
              <SelectItem value="Best Selling">Best Selling</SelectItem>
              <SelectItem value="Top Rating">Top Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Heading */}
        <div className="text-4xl md:text-5xl mb-10 font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-black bg-clip-text text-transparent">
          All Products
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-20">
          {products.map((product) => {
            const price = parseFloat(product.price);
            const discount = product.discountPercentage || 0;
            const discountedPrice = (price - (price * discount) / 100).toFixed(
              2
            );

            return (
              <div
                key={product._id}
                className="m-auto transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-50 hover:rounded-lg my-10"
              >
                <Link href={`/product-page/${product.slug}`}>
                <Image
                  className="rounded-sm hover:scale-105 overflow-hidden relative object-cover duration-200"
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  width={250}
                  height={250}
                />
                </Link>
                <p className="mt-2 text-[#029fae]">{product.name}</p>
                <div className="flex flex-col justify-between my-2">
                  {discount > 0 ? (
                    <p>
                      <span className=" text-gray-600 text-lg">
                        ${discountedPrice}
                      </span>
                      <span className="line-through ml-5 text-gray-500">${price}</span>{" "}
                    </p>
                  ) : (
                    <p>${price}</p>
                  )}
                  {/* Ratings */}
                  <div className="flex my-2">
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
                  {/* Card Button */}
                  <button
                    className="mt-5 text-sm w-full max-w-64 h-[40px] bg-[#029fae] text-white 
                  rounded-md snipcart-add-item font-semibold bg-gradient-to-b from-[#029fae] 
                  to-teal-600 shadow:sm transform transition-all duration-300 hover:scale-105"
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
            );
          })}
        </div>
      </div>
      {/* Pagination */}
      <div className="mb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default ProductPage;
