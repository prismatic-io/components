export interface Collection {
  id: string | null;
  description: string | null;
  descriptionHtml: string | null;
  handle: string | null;
  products: {
    nodes:
      | {
          descriptionHtml: string | null;
          category: string | null;
          createdAt: string | null;
          description: string | null;
          featuredMedia: {
            alt: string | null;
            id: string | null;
            preview: {
              image: {
                url: string | null;
                width: number | null;
                height: number | null;
                id: string | null;
              } | null;
            } | null;
            status: string | null;
          } | null;
          handle: string | null;
          id: string | null;
          priceRangeV2: {
            maxVariantPrice: {
              amount: string | null;
              currencyCode: string | null;
            } | null;
            minVariantPrice: {
              amount: string | null;
              currencyCode: string | null;
            } | null;
          } | null;
          productType: string | null;
          publishedAt: string | null;
          status: string | null;
          tags: string[] | null;
          title: string | null;
          totalInventory: number | null;
          vendor: string | null;
        }[]
      | null;
  } | null;
  productsCount: {
    count: number | null;
  } | null;
  sortOrder: string | null;
  title: string | null;
}
