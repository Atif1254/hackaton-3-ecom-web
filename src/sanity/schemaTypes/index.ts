import { type SchemaTypeDefinition } from 'sanity'
import productData from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productData],
}
