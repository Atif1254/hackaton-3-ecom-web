import { defineCliConfig } from 'sanity/cli';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error('Sanity CLI configuration is missing projectId or dataset.');
}

export default defineCliConfig({
  api: { projectId, dataset },
});
