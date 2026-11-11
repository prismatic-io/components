//#region src/types/collections.d.ts
interface CollectionProductImage {
  url: string | null;
  width: number | null;
  height: number | null;
  id: string | null;
}
interface CollectionProductFeaturedMedia {
  alt: string | null;
  id: string | null;
  preview: {
    image: CollectionProductImage | null;
  } | null;
  status: string | null;
}
interface CollectionProduct {
  descriptionHtml: string | null;
  category: string | null;
  createdAt: string | null;
  description: string | null;
  featuredMedia: CollectionProductFeaturedMedia | null;
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
}
interface Collection {
  id: string | null;
  description: string | null;
  descriptionHtml: string | null;
  handle: string | null;
  products: {
    nodes: CollectionProduct[] | null;
  } | null;
  productsCount: {
    count: number | null;
  } | null;
  sortOrder: string | null;
  title: string | null;
}
//#endregion
//#region src/types/common.d.ts
interface Count {
  count: number;
}
//#endregion
//#region src/types/metafields.d.ts
interface DeletedMetafield {
  key: string;
  namespace: string;
  ownerId: string;
}
//#endregion
//#region src/types/pagination.d.ts
interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}
//#endregion
//#region src/types/productImages.d.ts
interface RestProductImage {
  id: number | null;
  alt: string | null;
  position: number;
  product_id: number;
  created_at: string | null;
  updated_at: string | null;
  admin_graphql_api_id: string | null;
  width: number | null;
  height: number | null;
  src: string | null;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "shopify";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/shopify/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listMetafieldsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        metafields: {
          key: string;
          value: string;
          type: string;
          namespace: string;
          productId: string;
          description: any;
          jsonValue: string;
          createdAt: string;
          updatedAt: string;
        }[];
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
      };
    }>;
    setMetafieldGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      key: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      namespace: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        metafields: {
          key: string;
          value: string;
          type: string;
          namespace: string;
          productId: string;
          description: any;
          jsonValue: string;
          createdAt: string;
          updatedAt: string;
        }[];
        userErrors: any[];
      };
    }>;
    deleteMetafieldGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      key: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ownerId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      namespace: {
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        deletedMetafields: DeletedMetafield[];
      };
    }>;
    listCollectionsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"collections", Collection[]> & {
        pageInfo: PageInfo;
      };
    }>;
    getCollectionGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      collectionId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        collection: Collection;
      };
    }>;
    countCollectionsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    deleteCollectionGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      collectionId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    countVariantsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    createVariantGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      variant: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteVariantGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      variantId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getVariantGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      variantId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listVariantsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        example: string;
        clean: (value: unknown) => string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        dataSource: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"productVariants", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    updateVariantGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      updateVariant: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createProductGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionHtml: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productType: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendor: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productStatus: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      imageUrl: {
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      imageAlt: {
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      tags: {
        comments: string;
        example: string;
        clean: (value: unknown, returnUndefinedOnNoValue?: boolean) => string[] | undefined;
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        product: {
          id: number;
          title: string;
          body_html: string;
          vendor: string;
          product_type: string;
          created_at: string;
          handle: string;
          updated_at: string;
          published_at: any;
          template_suffix: any;
          tags: string;
          status: string;
          admin_graphql_api_id: string;
          variants: {
            id: number;
            product_id: number;
            title: string;
            price: string;
            position: number;
            inventory_policy: string;
            compare_at_price: any;
            created_at: string;
            updated_at: string;
            taxable: boolean;
            barcode: string;
            requires_shipping: boolean;
            sku: string;
            weight: number;
            weight_unit: string;
            inventory_item_id: number;
            inventory_quantity: number;
            admin_graphql_api_id: string;
          }[];
          options: {
            id: number;
            product_id: number;
            name: string;
            position: number;
            values: string[];
          }[];
          images: {
            id: number;
            alt: string;
            position: number;
            product_id: number;
            created_at: string;
            updated_at: string;
            admin_graphql_api_id: string;
            width: any;
            height: any;
            src: any;
          }[];
          image: {
            id: number;
            alt: string;
            product_id: number;
            created_at: string;
            updated_at: string;
            admin_graphql_api_id: string;
            width: any;
            height: any;
            src: any;
          };
        };
      };
    }>;
    deleteProductGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateProductGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      title: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      descriptionHtml: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      productType: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      vendor: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      productStatus: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
      imageUrl: {
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      imageAlt: {
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      tags: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, returnUndefinedOnNoValue?: boolean) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    countProductImagesGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    createProductImageGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      imageURL: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      imageAlt: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteProductImageGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      imageId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getProductImageGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      imageId: {
        example: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        image: Record<string, unknown>;
      };
    }>;
    cancelOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      reason: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      refund: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      restock: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      notifyCustomer: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      staffNote: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    closeOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    countOrdersGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    createOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderData: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listOrdersGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      query: {
        comments: string;
        placeholder: string;
        example: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"orders", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    countLocationsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    getLocationsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listLocationsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"locations", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    connectInventoryLevelGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteInventoryLevelsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      levelId: {
        example: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getInventoryLevelsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      levelId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listInventoryLevelsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"inventoryLevels", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    getInventoryItemsGql: import("@prismatic-io/spectral").ActionDefinition<{
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listInventoryItemsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"inventoryItems", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    updateInventoryItemsGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sku: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
      };
      cost: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      tracked: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: any;
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFulfillmentServiceGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentServiceName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      callbackUrl: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      inventoryManagement: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      trackingSupport: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteFulfillmentServiceGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentServiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getFulfillmentServiceGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentServiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listFulfillmentServicesGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateFulfillmentServiceGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentServiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fulfillmentServiceName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      callbackUrl: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        comments: string;
      };
      inventoryManagement: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: any;
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      trackingSupport: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: any;
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getFulfillmentGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    completeDraftOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      draftOrderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    countDraftOrdersGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    createDraftOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdGql: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      lineItems: {
        label: string;
        type: "code";
        required: true;
        language: "json";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => unknown[];
      };
      useCustomerAddress: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      note: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      taxExempt: {
        required: false;
        default: string;
        comments: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      tags: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        clean: (value: unknown, returnUndefinedOnNoValue?: boolean) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteDraftOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      draftOrderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getDraftOrderGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      draftOrderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    countCustomersGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Count;
    }>;
    createAccountActivationURLGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdGql: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    deleteCustomerGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdGql: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    updateCustomerGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdGql: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          firstName: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          lastName: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          email: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      addressListGql: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => unknown[];
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        clean: (value: unknown) => string[];
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
      };
      taxExempt: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: any;
        clean: (value: unknown) => boolean | undefined;
        comments: string;
      };
      metafields: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => unknown[];
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    listCurrenciesGql: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          endCursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<"currencies", unknown[]> & {
        pageInfo: PageInfo;
      };
    }>;
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookTopic: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => unknown[];
      };
      postUrl: {
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookFormat: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        webhook: {
          id: number;
          address: string;
          topic: string;
          created_at: string;
          updated_at: string;
          format: string;
          fields: any[];
          metafield_namespaces: any[];
          api_version: string;
          private_metafield_namespaces: any[];
        };
      };
    }>;
    deleteInstanceWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {};
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showOnlyInstanceWebhooks: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: number;
        address: string;
        topic: string;
        created_at: string;
        updated_at: string;
        format: string;
        fields: any[];
        metafield_namespaces: any[];
        api_version: string;
        private_metafield_namespaces: any[];
      }[];
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        pagination: {
          next: {
            page_info: string;
            rel: string;
          };
        };
        pageInfo: string;
        rel: string;
        data: {
          customers: {
            id: number;
            email: string;
            created_at: string;
            updated_at: string;
            first_name: string;
            last_name: string;
            state: string;
            last_order_id: any;
            note: any;
            verified_email: boolean;
            multipass_identifier: any;
            tax_exempt: boolean;
            tags: string;
            last_order_name: any;
            phone: string;
            addresses: {
              id: number;
              customer_id: number;
              first_name: string;
              last_name: string;
              company: string;
              address1: string;
              address2: string;
              city: string;
              province: string;
              country: string;
              zip: string;
              phone: string;
              name: string;
              province_code: string;
              country_code: string;
              country_name: string;
            }[];
            tax_exemptions: any[];
            email_marketing_consent: {
              state: string;
              opt_in_level: string;
              consent_updated_at: any;
            };
            sms_marketing_consent: {
              state: string;
              opt_in_level: string;
              consent_updated_at: any;
              consent_collected_from: string;
            };
            admin_graphql_api_id: string;
            default_address: {
              id: number;
              customer_id: number;
              first_name: string;
              last_name: string;
              company: string;
              address1: string;
              address2: string;
              city: string;
              province: string;
              country: string;
              zip: string;
              phone: string;
              name: string;
              province_code: string;
              country_code: string;
              country_name: string;
            };
          }[];
        };
      };
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      firstName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addressList: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown) => object;
      };
      verifiedEmail: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      tags: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          phone: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          notes: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          currency: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxExempt: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          metafields: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => object;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        customer: {
          id: number;
          email: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          state: string;
          last_order_id: any;
          note: any;
          verified_email: boolean;
          multipass_identifier: any;
          tax_exempt: boolean;
          tags: string;
          last_order_name: any;
          phone: string;
          addresses: {
            id: number;
            customer_id: number;
            first_name: string;
            last_name: string;
            company: string;
            address1: string;
            address2: string;
            city: string;
            province: string;
            country: string;
            zip: string;
            phone: string;
            name: string;
            province_code: string;
            country_code: string;
            country_name: string;
          }[];
          tax_exemptions: any[];
          email_marketing_consent: {
            state: string;
            opt_in_level: string;
            consent_updated_at: any;
          };
          sms_marketing_consent: {
            state: string;
            opt_in_level: string;
            consent_updated_at: any;
            consent_collected_from: string;
          };
          admin_graphql_api_id: string;
          default_address: {
            id: number;
            customer_id: number;
            first_name: string;
            last_name: string;
            company: string;
            address1: string;
            address2: string;
            city: string;
            province: string;
            country: string;
            zip: string;
            phone: string;
            name: string;
            province_code: string;
            country_code: string;
            country_name: string;
          };
        };
      };
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        product: {
          id: number;
          title: string;
          body_html: string;
          vendor: string;
          product_type: string;
          created_at: string;
          handle: string;
          updated_at: string;
          published_at: any;
          template_suffix: any;
          tags: string;
          status: string;
          admin_graphql_api_id: string;
          variants: {
            id: number;
            product_id: number;
            title: string;
            price: string;
            position: number;
            inventory_policy: string;
            compare_at_price: any;
            created_at: string;
            updated_at: string;
            taxable: boolean;
            barcode: string;
            requires_shipping: boolean;
            sku: string;
            weight: number;
            weight_unit: string;
            inventory_item_id: number;
            inventory_quantity: number;
            admin_graphql_api_id: string;
          }[];
          options: {
            id: number;
            product_id: number;
            name: string;
            position: number;
            values: string[];
          }[];
          images: {
            id: number;
            alt: string;
            position: number;
            product_id: number;
            created_at: string;
            updated_at: string;
            admin_graphql_api_id: string;
            width: any;
            height: any;
            src: any;
          }[];
          image: {
            id: number;
            alt: string;
            product_id: number;
            created_at: string;
            updated_at: string;
            admin_graphql_api_id: string;
            width: any;
            height: any;
            src: any;
          };
        };
      };
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      returnHeaders: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFulfillments: import("@prismatic-io/spectral").ActionDefinition<{
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          fulfillments: {
            id: number;
            order_id: number;
            status: string;
            created_at: string;
            service: string;
            updated_at: string;
            tracking_company: any;
            location_id: number;
            origin_address: any;
            line_items: {
              id: number;
              variant_id: any;
              title: string;
              quantity: number;
              sku: any;
              variant_title: any;
              vendor: string;
              product_id: any;
              requires_shipping: boolean;
              taxable: boolean;
              gift_card: boolean;
              name: string;
              price: {
                amount: string;
                currencyCode: string;
              };
              total_discount: {
                amount: string;
                currencyCode: string;
              };
              fulfillment_status: string;
              price_set: {
                shop_money: {
                  amount: string;
                  currency_code: string;
                };
                presentment_money: {
                  amount: string;
                  currency_code: string;
                };
              };
              total_discount_set: {
                shop_money: {
                  amount: string;
                  currency_code: string;
                };
                presentment_money: {
                  amount: string;
                  currency_code: string;
                };
              };
              discount_allocations: {
                amount: string;
                discount_application_index: number;
                amount_set: {
                  shop_money: {
                    amount: string;
                    currency_code: string;
                  };
                  presentment_money: {
                    amount: string;
                    currency_code: string;
                  };
                };
              }[];
              duties: any[];
              admin_graphql_api_id: string;
            }[];
            tracking_number: any;
            tracking_numbers: any[];
            tracking_url: any;
            tracking_urls: any[];
            name: string;
            admin_graphql_api_id: string;
          }[];
        };
      };
    }>;
    getFulfillmentOrder: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentOrderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          fulfillment_order: {
            id: number;
            order_id: number;
            request_status: string;
            status: string;
            supported_actions: string[];
            destination: {
              id: number;
              address1: any;
              address2: any;
              city: any;
              company: any;
              country: any;
              email: string;
              first_name: any;
              last_name: any;
              phone: any;
              province: any;
              zip: any;
            };
            line_items: {
              id: number;
              quantity: number;
              line_item_id: number;
              inventory_item_id: number;
              variant_id: number;
            }[];
            international_duties: any;
            fulfill_at: string;
            fulfill_by: any;
            fulfillment_holds: any[];
            created_at: string;
            updated_at: string;
            delivery_method: {
              id: number;
              method_type: string;
              min_delivery_date_time: any;
              max_delivery_date_time: any;
              additional_information: {
                instructions: any;
                phone: any;
              };
              service_code: string;
              source_reference: any;
              branded_promise: any;
              presented_name: string;
            };
            assigned_location: {
              address1: string;
              address2: any;
              city: string;
              country_code: string;
              location_id: number;
              name: string;
              phone: string;
              province: string;
              zip: string;
            };
            merchant_requests: any[];
          };
        };
      };
    }>;
    listFulfillmentOrders: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        pagination: {
          next: {
            page_info: string;
            rel: string;
          };
        };
        pageInfo: string;
        rel: string;
        data: {
          fulfillment_orders: {
            id: number;
            order_id: number;
            request_status: string;
            status: string;
            supported_actions: string[];
            destination: {
              id: number;
              address1: any;
              address2: any;
              city: any;
              company: any;
              country: any;
              email: string;
              first_name: any;
              last_name: any;
              phone: any;
              province: any;
              zip: any;
            };
            line_items: {
              id: number;
              quantity: number;
              line_item_id: number;
              inventory_item_id: number;
              variant_id: number;
            }[];
            international_duties: any;
            fulfill_at: string;
            fulfill_by: any;
            fulfillment_holds: any[];
            created_at: string;
            updated_at: string;
            delivery_method: {
              id: number;
              method_type: string;
              min_delivery_date_time: any;
              max_delivery_date_time: any;
              additional_information: {
                instructions: any;
                phone: any;
              };
              service_code: string;
              source_reference: any;
              branded_promise: any;
              presented_name: string;
            };
            assigned_location: {
              address1: string;
              address2: any;
              city: string;
              country_code: string;
              location_id: number;
              name: string;
              phone: string;
              province: string;
              zip: string;
            };
            merchant_requests: any[];
          }[];
        };
      };
    }>;
    countProducts: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: Count;
      };
    }>;
    listDraftOrders: import("@prismatic-io/spectral").ActionDefinition<{
      getAlldata: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          pageInfo: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        pagination: {
          next: {
            page_info: string;
            rel: string;
          };
        };
        pageInfo: string;
        rel: string;
        data: {
          draft_orders: {
            id: number;
            note: any;
            email: string;
            taxes_included: boolean;
            currency: string;
            invoice_sent_at: any;
            created_at: string;
            updated_at: string;
            tax_exempt: boolean;
            completed_at: any;
            name: string;
            status: string;
            line_items: {
              id: number;
              variant_id: any;
              product_id: any;
              title: string;
              variant_title: any;
              sku: string;
              vendor: string;
              quantity: number;
              requires_shipping: boolean;
              taxable: boolean;
              gift_card: boolean;
              fulfillment_service: string;
              tax_lines: {
                channel_liable: any;
                rate: number;
                title: string;
                price_set: {
                  shop_money: {
                    amount: string;
                    currency_code: string;
                  };
                };
                price: string;
              }[];
              applied_discount: any;
              name: string;
              custom: boolean;
              original_unit_price: string;
              admin_graphql_api_id: string;
            }[];
            shipping_address: {
              first_name: string;
              last_name: string;
              address1: string;
              address2: any;
              city: string;
              province: string;
              country: string;
              zip: string;
              phone: string;
            };
            billing_address: {
              first_name: string;
              last_name: string;
              address1: string;
              address2: any;
              city: string;
              province: string;
              country: string;
              zip: string;
              phone: string;
            };
            invoice_url: string;
            applied_discount: any;
            order_id: any;
            shipping_line: any;
            tax_lines: {
              rate: number;
              rate_percentage: number;
              source: any;
              price_set: {
                shop_money: {
                  amount: string;
                  currency_code: string;
                };
              };
              price: string;
              channel_liable: any;
              title: string;
            }[];
            tags: string;
            total_price: string;
            subtotal_price: string;
            total_tax: string;
            payment_terms: any;
            customer: {
              id: number;
              email: string;
              first_name: string;
              last_name: string;
              phone: string;
            };
            admin_graphql_api_id: string;
          }[];
        };
      };
    }>;
    getShopConfig: import("@prismatic-io/spectral").ActionDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          shop: {
            id: number;
            name: string;
            email: string;
            domain: string;
            province: string;
            country: string;
            address1: string;
            zip: string;
            city: string;
            phone: string;
            latitude: number;
            longitude: number;
            address2: any;
            created_at: string;
            updated_at: string;
            country_code: string;
            country_name: string;
            currency: string;
            timezone: string;
            iana_timezone: string;
            shop_owner: string;
            money_format: string;
            money_with_currency_format: string;
            weight_unit: string;
            province_code: string;
            taxes_included: boolean;
            tax_shipping: boolean;
            plan_display_name: string;
            myshopify_domain: string;
            money_in_emails_format: string;
            money_with_currency_in_emails_format: string;
            checkout_api_supported: boolean;
            setup_required: boolean;
            enabled_presentment_currencies: string[];
            marketing_sms_consent_enabled_at_checkout: boolean;
            transactional_sms_disabled: boolean;
          };
        };
      };
    }>;
    listProductImages: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: {
          images: RestProductImage[];
        };
      };
    }>;
    graphQlRawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      apiVersion: {
        label: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      query: {
        label: string;
        type: "code";
        required: true;
        language: "graphql";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variables: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      variablesObject: {
        label: string;
        type: "code";
        comments: string;
        example: string;
        placeholder: string;
        language: "json";
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      secret_key: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    customersPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    eventTopicWebhookGql: import("@prismatic-io/spectral").TriggerDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      secret_key: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookTopics: {
        collection: "valuelist";
        clean: (value: unknown, returnUndefinedOnNoValue?: boolean) => string[] | undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    ordersPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    productsPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    listCollections: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listDraftOrders: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFulfillmentOrders: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFulfillmentServices: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listFulfillments: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listInventoryItems: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listLocations: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listOrders: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listProductImages: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listProducts: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listVariants: import("@prismatic-io/spectral").DataSourceDefinition<{
      shopifyConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2-dynamic-inputs";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      domain: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        example: string;
        comments: string;
        required: false;
        shown: true;
      };
    } & Partial<import("@prismatic-io/spectral").OAuth2AuthorizationCodeInputs> & {
      [key: string]: import("@prismatic-io/spectral").ConnectionInput;
    } & {
      tokenUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
      authorizeUrl: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    } & {
      [key: string]: import("@prismatic-io/spectral").ConnectionTemplateInputField;
    };
  }, "oauth2-dynamic-inputs"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "adminApiAccessToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      adminApiAccessToken: {
        label: string;
        type: "password";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
      host: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        example: string;
        comments: string;
        required: true;
        shown: true;
      };
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        example: string;
        comments: string;
        required: false;
        shown: true;
      };
    };
  }, "adminApiAccessToken"> | import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      host: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        example: string;
        comments: string;
        required: true;
        shown: true;
      };
      apiVersion: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        example: string;
        comments: string;
        required: false;
        shown: true;
      };
    };
  }, "oauth2">)[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;