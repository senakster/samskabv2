export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-08-02'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const useCdn = false // Must be false to get fresh data to revalidate
