//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "bigcommerce";
  documentationUrl: "https://prismatic.io/docs/components/bigcommerce/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listBrands: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      pageLimit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBrand: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBrand: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandNameToCreate: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      metaKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (keywordsInput: unknown) => string[];
      };
      metaDescription: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      searchKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      imageUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateBrand: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandIdToUpdate: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newBrandName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      newPageTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      newImageUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteBrand: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandIdToDelete: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createBrandImage: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      imageFile: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteBrandImage: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      brandId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllCategories: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      id_not_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      id_min: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_max: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_greater: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_less: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      name_like: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_min: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_max: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_greater: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_less: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      page_title: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      page_title_like: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      keyword: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      is_visible: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      include_fields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCategory: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      excludeFields: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCategory: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryDescription: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      views: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      pageTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      searchKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      metaKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (keywordsInput: unknown) => string[];
      };
      metaDescription: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      layoutFile: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isVisible: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      defaultProductSort: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      imageUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      customUrl: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCategory: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryDescription: {
        label: string;
        placeholder: string;
        type: "text";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      views: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      sortOrder: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      pageTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      searchKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      metaKeywords: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (keywordsInput: unknown) => string[];
      };
      metaDescription: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      layoutFile: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isVisible: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      defaultProductSort: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      imageUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      customUrl: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCategories: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      id_not_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      id_min: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_max: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_greater: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      id_less: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parentId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageTitle: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      keyword: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      isVisible: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      name_like: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_in: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_min: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_max: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_greater: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      parent_id_less: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      pageTitle_like: {
        type: "string";
        label: string;
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCategoryImage: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      imageFile: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCategoryImage: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllCategoryTrees: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      category_id_in: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      channelId_in: {
        type: "string";
        label: string;
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCategoryTree: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tree_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      depth: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    upsertCategoryTrees: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryTreeData: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (treeDataInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCategoryTrees: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      category_id_in: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllCategoriesSimple: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      category_id_in: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCategoryTree: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parent_id_Tree: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryNameTree: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCategories: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tree_id_update: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      category_id_update: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCategoriesTree: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      category_uuid: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      category_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tree_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parent_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllProducts: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productPrice: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productBrandId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productPage: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productLimit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductName: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductType: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductPrice: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductSku: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductDescription: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductWeight: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductWidth: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductDepth: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductHeight: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueCostPrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueRetailPrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueSalePrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productIdToDelete: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductName: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductType: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductWeight: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductWidth: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductDepth: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductHeight: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueProductPrice: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueCostPrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueRetailPrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      uniqueSalePrice: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductsBatch: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueProductBatch: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        required: true;
        comments: string;
        clean: (productBatchInput: unknown) => any;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductCustomFields: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCustomFieldsProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCustomFieldsProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldValue: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCustomFieldsProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldIdToUpdate: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldValue: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomField: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCustomFieldsProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldIdToDelete: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllProductImages: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productImagesProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductImage: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productImageProductId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productImageImageId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProductImageAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_file: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_url: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductImageAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_file: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      image_url: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      url_zoom: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      url_standard: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      url_thumbnail: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      url_tiny: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_thumbnail: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      sort_order: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductImageAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCatalogSummaryAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllProductModifiersAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      include_fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getModifierAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      modifier_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      include_fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProductModifierAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      required: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
      };
      sort_order: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      config: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
      };
      option_values: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
      };
      display_name: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductModifierAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      modifier_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      required: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
      };
      sort_order: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      config: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
      };
      option_values: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
      };
      display_name: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductModifierAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      modifier_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createModifierImageAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      modifier_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllProductVariantsAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      include_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductVariantAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variant_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      include_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProductVariantAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sku: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      option_values: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (optionValuesInput: unknown) => any;
      };
      price: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      weight: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      width: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      height: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      depth: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProductVariantAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variant_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sku: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      option_values: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (optionValuesInput: unknown) => any;
      };
      price: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      weight: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      width: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      height: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      depth: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProductVariantAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variant_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createVariantImageAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variant_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      image_url: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebhooksAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_active: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      scope: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      destination: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebhookAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      scope: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      destination: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_active: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      events_history_enabled: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebhookAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhook_id: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      scope: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      destination: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_active: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhookAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhook_id: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInstancedWebhooksAction: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      instanceURLPattern: {
        label: string;
        type: "string";
        placeholder: string;
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      is_active: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      scope: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      destination: {
        label: string;
        type: "string";
        placeholder: string;
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown) => string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    myTrigger: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewOrders: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedOrders: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectBrands: import("@prismatic-io/spectral").DataSourceDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCategories: import("@prismatic-io/spectral").DataSourceDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProducts: import("@prismatic-io/spectral").DataSourceDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProductModifiers: import("@prismatic-io/spectral").DataSourceDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProductVariants: import("@prismatic-io/spectral").DataSourceDefinition<{
      bigCommerceConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeHash: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      product_id: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      page: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      include_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      exclude_fields: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2bigcommerce";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        example: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        example: string;
        default: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
        example: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        example: string;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "oauth2bigcommerce">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;