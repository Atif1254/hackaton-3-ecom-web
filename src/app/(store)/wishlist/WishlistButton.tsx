// app/wishlist/wishlistButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; // Import Heart Icon

type WishlistButtonProps = {
  productId: string;
};

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(false);

  // Check if the product is already in the wishlist
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setInWishlist(wishlist.includes(productId));
  }, [productId]);

  // Add or remove the product from the wishlist
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (inWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setInWishlist(false);
    } else {
      // Add to wishlist
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setInWishlist(true);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full ${inWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
    >
      <HeartIcon className={`h-6 w-6 ${inWishlist ? 'text-white' : 'text-red-500'}`} />
    </button>
  );
}
