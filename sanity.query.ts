import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function fetchProducts() {
  const query = `*[_type == "product"][0..5]{
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    discountPercentage,
    stockLevel,
    category,
    isFeaturedProduct
  }`;

  return await client.fetch(query);
}
