import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  token: import.meta.env.VITE_APP_SANITY_TOKEN,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
