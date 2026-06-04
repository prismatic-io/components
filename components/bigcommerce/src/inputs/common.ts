import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const storeHash = input({
  label: "Store Hash",
  placeholder: "Enter Store Hash",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the BigCommerce store. Find this in the store's API credentials or URL (e.g., the store hash from https://api.bigcommerce.com/stores/{store_hash}).",
  example: "abc12defg3",
  clean: util.types.toString,
});

export const brandName = input({
  label: "Brand Name",
  placeholder: "Enter brand name",
  type: "string",
  required: false,
  comments: "Restrict the brand list to entries whose name matches this value.",
  example: "Apple",
  clean: cleanString,
});

export const brandId = input({
  label: "Brand ID",
  placeholder: "Enter Brand ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the brand to retrieve.",
  example: "123",
  clean: cleanString,
});

export const pageLimit = input({
  label: "Limit",
  placeholder: "Enter limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page.",
  example: "50",
  clean: cleanString,
});

export const bigCommerceConnection = input({
  label: "BigCommerce Connection",
  type: "connection",
  required: true,
  comments: "The BigCommerce connection to use.",
});

export const brandNameToCreate = input({
  label: "Brand Name",
  placeholder: "Enter brand name",
  type: "string",
  required: true,
  comments: "The unique name for the new Brand to be created.",
  example: "Nike",
  clean: util.types.toString,
});

export const pageTitle = input({
  label: "Page Title",
  placeholder: "Enter page title",
  type: "string",
  required: false,
  comments:
    "The title shown in the browser tab and used as the storefront page heading.",
  example: "Shop Nike Products",
  clean: cleanString,
});

export const metaKeywords = input({
  label: "Meta Keywords",
  placeholder: "keyword1, keyword2, keyword3...",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of meta keywords used in the brand's SEO metadata.",
  clean: (keywordsInput) => {
    if (typeof keywordsInput !== "string") return [];
    return keywordsInput.split(",").map((keyword) => keyword.trim());
  },
});

export const metaDescription = input({
  label: "Meta Description",
  placeholder: "Enter meta description",
  type: "string",
  required: false,
  comments:
    "A short SEO summary displayed in search engine results for the brand.",
  example:
    "Shop the latest Nike products including shoes, apparel, and accessories.",
  clean: cleanString,
});

export const searchKeywords = input({
  label: "Search Keywords",
  placeholder: "Enter comma-separated keywords",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of keywords used by the storefront search to match this brand.",
  example: "athletic, sportswear, running",
  clean: cleanString,
});

export const imageUrl = input({
  label: "Image URL",
  placeholder: "Enter image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL of the image displayed for the brand on the storefront.",
  example: "https://cdn.example.com/images/brand-logo.png",
  clean: cleanString,
});

export const brandIdToUpdate = input({
  label: "Brand ID to Update",
  placeholder: "Enter Brand ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the brand being modified.",
  example: "456",
  clean: util.types.toString,
});

export const newBrandName = input({
  label: "New Brand Name",
  placeholder: "Enter brand name",
  type: "string",
  required: true, 
  comments: "The replacement display name to assign to the brand.",
  example: "Nike Sportswear",
  clean: util.types.toString,
});

export const newPageTitle = input({
  label: "New Page Title",
  placeholder: "Enter page title",
  type: "string",
  required: false,
  comments:
    "The replacement browser tab title and storefront heading for the brand page.",
  example: "Nike Sportswear Collection",
  clean: cleanString,
});

export const newImageUrl = input({
  label: "New Image URL",
  placeholder: "Enter image URL",
  type: "string",
  required: false,
  comments:
    "The replacement fully qualified URL of the image displayed for the brand.",
  example: "https://cdn.example.com/images/new-brand-logo.png",
  clean: cleanString,
});

export const brandIdToDelete = input({
  label: "Brand ID to Delete",
  placeholder: "Enter Brand ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the brand to permanently remove.",
  example: "789",
  clean: util.types.toString,
});

export const imageFile = input({
  label: "Image File",
  type: "data",
  required: true,
  comments:
    "The image file to be uploaded. Must be a valid image format (GIF, JPEG, or PNG).",
  placeholder: "Select image file",
});

export const id = input({
  label: "ID",
  placeholder: "Enter ID",
  type: "string",
  required: false,
  comments: "Restrict results to the item that has this exact numeric ID.",
  example: "39",
  clean: cleanString,
});

export const id_in = input({
  label: "ID In",
  placeholder: "Enter ID values separated by comma",
  type: "string",
  required: false,
  comments:
    "Restrict results to items whose ID appears in this comma-separated list.",
  clean: cleanString,
});

export const name = input({
  label: "Name",
  placeholder: "Enter category name",
  type: "string",
  required: false,
  comments: "Restrict results to items whose name matches this value exactly.",
  clean: cleanString,
});

export const parent_id = input({
  label: "Parent ID",
  placeholder: "Enter parent ID",
  type: "string",
  required: false,
  comments:
    "Restrict results to items whose immediate parent has this numeric ID.",
  example: "19",
  clean: cleanString,
});

export const page = input({
  label: "Page",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  comments:
    "The 1-based index of the page to retrieve from the paginated result set.",
});

export const limit = input({
  label: "Limit",
  placeholder: "Enter limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page.",
});

export const include_fields = input({
  label: "Include Fields",
  placeholder: "Enter fields separated by comma",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to keep. The ID is always returned.",
  clean: cleanString,
});

export const exclude_fields = input({
  label: "Exclude Fields",
  placeholder: "Enter fields separated by comma",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to omit. The ID cannot be excluded.",
  clean: cleanString,
});

export const id_not_in = input({
  label: "ID Not In",
  placeholder: "Enter ID values not to include, separated by comma",
  type: "string",
  required: false,
  comments:
    "Exclude any item whose ID appears in this comma-separated list of values.",
  clean: cleanString,
});

export const id_min = input({
  label: "ID Min",
  placeholder: "Enter minimum ID",
  type: "string",
  required: false,
  comments:
    "Lower bound (inclusive) on the item ID. Items with smaller IDs are excluded.",
  example: "10",
  clean: cleanString,
});

export const id_max = input({
  label: "ID Max",
  placeholder: "Enter maximum ID",
  type: "string",
  required: false,
  comments:
    "Upper bound (inclusive) on the item ID. Items with larger IDs are excluded.",
  example: "100",
  clean: cleanString,
});

export const id_greater = input({
  label: "ID Greater Than",
  placeholder: "Enter ID",
  type: "string",
  required: false,
  comments:
    "Return only items whose ID is strictly greater than the specified value.",
  example: "50",
  clean: cleanString,
});

export const id_less = input({
  label: "ID Less Than",
  placeholder: "Enter ID",
  type: "string",
  required: false,
  comments:
    "Return only items whose ID is strictly less than the specified value.",
  example: "75",
  clean: cleanString,
});

export const name_like = input({
  label: "Name Contains",
  placeholder: "Enter part of the category name",
  type: "string",
  required: false,
  comments:
    "Substring used to perform a partial, case-insensitive match against item names.",
  clean: cleanString,
});

export const parent_id_in = input({
  label: "Parent ID In",
  placeholder: "Enter Parent ID values separated by comma",
  type: "string",
  required: false,
  comments:
    "Restrict results to items whose parent ID appears in this comma-separated list.",
  clean: cleanString,
});

export const parent_id_min = input({
  label: "Parent ID Min",
  placeholder: "Enter minimum parent ID",
  type: "string",
  required: false,
  comments:
    "Lower bound (inclusive) on the parent ID. Items with smaller parent IDs are excluded.",
  example: "5",
  clean: cleanString,
});

export const parent_id_max = input({
  label: "Parent ID Max",
  placeholder: "Enter maximum parent ID",
  type: "string",
  required: false,
  comments:
    "Upper bound (inclusive) on the parent ID. Items with larger parent IDs are excluded.",
  example: "50",
  clean: cleanString,
});

export const parent_id_greater = input({
  label: "Parent ID Greater Than",
  placeholder: "Enter parent ID",
  type: "string",
  required: false,
  comments:
    "Return only items whose parent ID is strictly greater than the specified value.",
  example: "20",
  clean: cleanString,
});

export const parent_id_less = input({
  label: "Parent ID Less Than",
  placeholder: "Enter parent ID",
  type: "string",
  required: false,
  comments:
    "Return only items whose parent ID is strictly less than the specified value.",
  example: "30",
  clean: cleanString,
});

export const page_title = input({
  label: "Page Title",
  placeholder: "Enter page title",
  type: "string",
  required: false,
  comments:
    "Restrict results to items whose storefront page title matches this value exactly.",
  clean: cleanString,
});

export const page_title_like = input({
  label: "Page Title Contains",
  placeholder: "Enter part of the page title",
  type: "string",
  required: false,
  comments:
    "Substring used to perform a partial match against storefront page titles.",
  clean: cleanString,
});

export const keyword = input({
  label: "Keyword",
  placeholder: "Enter keyword",
  type: "string",
  required: false,
  comments:
    "Free-text search term matched against item names, descriptions, and search keywords.",
});

export const is_visible = input({
  label: "Is Visible",
  type: "boolean",
  required: false,
  comments:
    "When true, returns only items visible on the storefront. When false, returns only hidden items.",
});

export const categoryId = input({
  label: "Category ID",
  placeholder: "Enter Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the category to operate on.",
  example: "39",
  clean: util.types.toString,
});

export const includeFields = input({
  label: "Include Fields",
  placeholder: "id,name,description,etc.",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to keep. The ID is always returned.",
  clean: cleanString,
});

export const excludeFields = input({
  label: "Exclude Fields",
  placeholder: "name,description,etc.",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to omit. The ID cannot be excluded.",
  clean: cleanString,
});

export const parentId = input({
  label: "Parent ID",
  placeholder: "Enter parent ID (0 for top-level)",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the parent category. Use 0 to create a top-level category.",
  example: "0",
  clean: util.types.toString,
});

export const categoryName = input({
  label: "Category Name",
  placeholder: "Enter category name",
  type: "string",
  required: true,
  comments:
    "The display name for the category. Must be unique among its sibling categories.",
  example: "Bath",
  clean: util.types.toString,
});

export const categoryDescription = input({
  label: "Category Description",
  placeholder: "Enter category description",
  type: "text",
  required: false,
  comments:
    "The storefront description shown on the category landing page. May include HTML markup.",
  example: "<p>We offer a wide variety of products perfect for relaxing</p>",
  clean: cleanString,
});

export const views = input({
  label: "Views",
  placeholder: "Enter view count",
  type: "string",
  required: false,
  comments: "The recorded number of storefront visits to the category page.",
  example: "1050",
  clean: cleanString,
});

export const sortOrder = input({
  label: "Sort Order",
  placeholder: "Enter sort order",
  type: "string",
  required: false,
  comments:
    "The display priority for the category in storefront menus. Lower values appear first.",
  example: "3",
  clean: cleanString,
});

export const layoutFile = input({
  label: "Layout File",
  placeholder: "Enter layout filename",
  type: "string",
  required: false,
  comments:
    "The template filename used to render this category. Relevant for Blueprint themes only.",
  example: "category.html",
  clean: cleanString,
});

export const isVisible = input({
  label: "Is Visible",
  type: "boolean",
  required: false,
  comments:
    "When true, the category is visible on the storefront. When false, the category is hidden from customers.",
});

export const defaultProductSort = input({
  label: "Default Product Sort",
  placeholder: "Enter sort method",
  type: "string",
  required: false,
  comments:
    "The default ordering applied to products when the category page loads (e.g. use_store_settings, featured, newest).",
  example: "use_store_settings",
  clean: cleanString,
});

export const customUrl = input({
  label: "Custom URL",
  type: "text",
  required: false,
  comments:
    "The storefront URL path for the category, relative to the store domain.",
  placeholder: "Enter custom URL",
  example: "/bath-products",
  clean: cleanString,
});

export const pageTitle_like = input({
  type: "string",
  label: "Page Title Like",
  required: false,
  comments:
    "Substring used to perform a partial match against category page titles.",
  placeholder: "Enter part of page title",
  example: "Bath",
  clean: cleanString,
});

export const channelId_in = input({
  type: "string",
  label: "Channel ID In",
  required: false,
  comments:
    "A comma-separated list of channel IDs used to restrict results to specific storefront channels.",
  placeholder: "Enter Channel IDs separated by comma",
  example: "1,2,3",
  clean: cleanString,
});

export const category_id_in = input({
  label: "ID In",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of category IDs to restrict the result set to.",
  placeholder: "Enter IDs separated by comma",
  example: "39,40,41",
  clean: cleanString,
});

export const tree_id = input({
  label: "Tree ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the category tree to operate on.",
  placeholder: "Enter Tree ID",
  example: "1",
  clean: util.types.toString,
});

export const depth = input({
  label: "Depth",
  type: "string",
  required: false,
  comments:
    "The maximum number of nesting levels to traverse when fetching the category tree.",
  placeholder: "Enter maximum depth",
  example: "3",
});

export const categoryTreeData = input({
  label: "Category Tree Data",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      id: 0,
      name: "string",
      channel_ids: [0],
    },
    null,
    2,
  ),
  required: true,
  comments:
    "A JSON array of category tree objects to upsert. Each object must include name and channel_ids.",
  clean: (treeDataInput) => {
    if (!util.types.isJSON(util.types.toString(treeDataInput))) {
      throw new Error("Invalid JSON provided for Category Tree Data.");
    }
    return JSON.parse(util.types.toString(treeDataInput));
  },
});

export const parent_id_Tree = input({
  label: "Parent ID",
  type: "string",
  required: true,
  comments:
    "Set to 0 for top level category. Otherwise, set to the ID of the parent category.",
  placeholder: "Enter parent ID (0 for top-level)",
  example: "0",
  clean: util.types.toString,
});

export const categoryNameTree = input({
  label: "Category Name",
  type: "string",
  required: true,
  comments:
    "The display name shown for the category on the storefront and admin panel.",
  placeholder: "Enter category name",
  example: "Garden",
  clean: util.types.toString,
});

export const tree_id_update = input({
  label: "Tree ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the category tree being updated.",
  placeholder: "Enter Tree ID",
  example: "2",
  clean: util.types.toString,
});

export const category_id_update = input({
  label: "Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the category being updated.",
  placeholder: "Enter Category ID",
  example: "42",
  clean: util.types.toString,
});

export const category_uuid = input({
  label: "Category UUID",
  type: "string",
  required: false,
  comments:
    "The UUID-formatted unique identifier for the category. Used as an alternative to numeric category IDs.",
  placeholder: "Enter Category UUID",
  example: "550e8400-e29b-41d4-a716-446655440000",
  clean: cleanString,
});

export const category_id = input({
  label: "Category ID",
  type: "string",
  required: true,
  comments: "The numeric identifier for the category targeted by this request.",
  placeholder: "Enter Category ID",
  example: "45",
  clean: util.types.toString,
});

export const productId = input({
  label: "Product ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the product. When used as a filter, only matching products are returned.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: cleanString,
});

export const productName = input({
  label: "Product Name",
  type: "string",
  required: false,
  comments: "Restrict results to products whose name matches this value.",
  placeholder: "Enter product name",
  example: "Blue T-Shirt",
  clean: cleanString,
});

export const productPrice = input({
  label: "Product Price",
  type: "string",
  required: false,
  comments:
    "Restrict results to products whose listed price equals this value.",
  placeholder: "Enter price",
  example: "29.99",
  clean: cleanString,
});

export const productBrandId = input({
  label: "Brand ID",
  type: "string",
  required: false,
  comments: "Restrict results to products belonging to the brand with this ID.",
  placeholder: "Enter Brand ID",
  example: "456",
  clean: cleanString,
});

export const productType = input({
  label: "Product Type",
  type: "string",
  required: false,
  comments:
    "Restrict results to products of the given type (e.g. physical or digital).",
  placeholder: "Enter product type",
  example: "physical",
  clean: cleanString,
});

export const productPage = input({
  label: "Page",
  type: "string",
  required: false,
  comments:
    "The 1-based index of the page to retrieve from the paginated product list.",
  placeholder: "Enter page number",
  example: "1",
  clean: cleanString,
});

export const productLimit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of products to return per page.",
  placeholder: "Enter limit",
  example: "50",
  clean: cleanString,
});

export const uniqueProductName = input({
  label: "Product Name",
  type: "text",
  required: true,
  comments:
    "A unique storefront name for the product. Must be 1 to 250 characters.",
  placeholder: "Enter product name",
  example: "Premium Cotton T-Shirt",
  clean: util.types.toString,
});

export const uniqueProductType = input({
  label: "Product Type",
  type: "text",
  required: true,
  comments:
    "The fulfillment type for the product. Must be either 'physical' or 'digital'.",
  placeholder: "Enter product type",
  example: "physical",
  clean: util.types.toString,
});

export const uniqueProductSku = input({
  label: "Product SKU",
  type: "text",
  required: false,
  comments:
    "A user-defined alphanumeric stock-keeping unit code, unique within the store. Length 0 to 255 characters.",
  placeholder: "Enter SKU",
  example: "TSHIRT-BLUE-M",
  clean: cleanString,
});

export const uniqueProductDescription = input({
  label: "Product Description",
  type: "text",
  required: false,
  comments:
    "The storefront description for the product. May include HTML markup for formatting.",
  placeholder: "Enter product description",
  example: "<p>100% cotton t-shirt with comfortable fit</p>",
  clean: cleanString,
});

export const uniqueProductWeight = input({
  label: "Product Weight",
  type: "text",
  required: true,
  comments:
    "The shipping weight of the product, expressed in the store's configured weight unit.",
  placeholder: "Enter weight",
  example: "0.5",
  clean: util.types.toString,
});

export const uniqueProductWidth = input({
  label: "Product Width",
  type: "text",
  required: false,
  comments:
    "The physical width used by shipping calculators, expressed in the store's configured length unit.",
  placeholder: "Enter width",
  example: "10",
  clean: cleanString,
});

export const uniqueProductDepth = input({
  label: "Product Depth",
  type: "text",
  required: false,
  comments:
    "The physical depth used by shipping calculators, expressed in the store's configured length unit.",
  placeholder: "Enter depth",
  example: "2",
  clean: cleanString,
});

export const uniqueProductHeight = input({
  label: "Product Height",
  type: "text",
  required: false,
  comments:
    "The physical height used by shipping calculators, expressed in the store's configured length unit.",
  placeholder: "Enter height",
  example: "12",
  clean: cleanString,
});

export const uniqueProductPrice = input({
  label: "Product Price",
  type: "text",
  required: true,
  comments:
    "The listed selling price of the product. Whether tax is included depends on the store's tax settings.",
  placeholder: "Enter price",
  example: "29.99",
  clean: util.types.toString,
});

export const uniqueCostPrice = input({
  label: "Cost Price",
  type: "text",
  required: false,
  comments:
    "The merchant cost of acquiring the product. Stored for internal reporting only and not shown to customers.",
  placeholder: "Enter cost price",
  example: "15.00",
  clean: cleanString,
});

export const uniqueRetailPrice = input({
  label: "Retail Price",
  type: "text",
  required: false,
  comments:
    "The manufacturer's suggested retail price. When set, this value is displayed alongside the selling price on the product page.",
  placeholder: "Enter retail price",
  example: "39.99",
  clean: cleanString,
});

export const uniqueSalePrice = input({
  label: "Sale Price",
  type: "text",
  required: false,
  comments:
    "An override price used in place of the regular price for promotional pricing calculations.",
  placeholder: "Enter sale price",
  example: "24.99",
  clean: cleanString,
});

export const uniqueProductBatch = input({
  label: "Products (Batch)",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        id: 0,
        name: "string",
        type: "physical",
        sku: "string",
        description: "string",
        weight: 0,
        width: 0,
        depth: 0,
        height: 0,
        price: 0,
        cost_price: 0,
        retail_price: 0,
        sale_price: 0,
        map_price: 0,
        tax_class_id: 0,
        product_tax_code: "string",
        categories: [],
        brand_id: 0,
        brand_name: "string",
        inventory_level: 0,
        inventory_warning_level: 0,
      },
    ],
    null,
    2,
  ),
  required: true,
  comments:
    "A JSON array of product objects to upsert in a single batch operation. Each object must include the product ID and any fields to update.",
  clean: (productBatchInput) => {
    if (!util.types.isJSON(util.types.toString(productBatchInput))) {
      throw new Error("Invalid JSON provided for Products (Batch) input.");
    }
    return JSON.parse(util.types.toString(productBatchInput));
  },
});

export const productIdToDelete = input({
  label: "Product ID to Delete",
  type: "text",
  required: true,
  comments: "The unique identifier of the product to permanently remove.",
  placeholder: "Enter Product ID",
  example: "103",
  clean: util.types.toString,
});

export const productCustomFieldsProductId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product whose custom fields will be retrieved.",
  placeholder: "Enter Product ID",
  example: "105",
  clean: util.types.toString,
});

export const customFieldName = input({
  label: "Custom Field Name",
  type: "string",
  required: true,
  comments:
    "The display name (key) for the custom field attached to the product.",
  placeholder: "Enter field name",
  example: "warranty_months",
  clean: util.types.toString,
});

export const customFieldValue = input({
  label: "Custom Field Value",
  type: "string",
  required: true,
  comments: "The value stored under the custom field key on the product.",
  placeholder: "Enter field value",
  example: "12",
  clean: util.types.toString,
});

export const customFieldIdToUpdate = input({
  label: "Custom Field ID to Update",
  type: "string",
  required: true,
  comments: "The unique identifier of the custom field record being modified.",
  placeholder: "Enter Custom Field ID",
  example: "7",
  clean: util.types.toString,
});

export const customFieldIdToDelete = input({
  label: "Custom Field ID to Delete",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the custom field record to permanently remove.",
  placeholder: "Enter Custom Field ID",
  example: "8",
  clean: util.types.toString,
});

export const productImagesProductId = input({
  label: "Product ID for Images",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product whose image collection will be retrieved.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const productImageProductId = input({
  label: "Product ID for Image",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product that owns the image being retrieved.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const productImageImageId = input({
  label: "Image ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the specific image record to retrieve.",
  placeholder: "Enter Image ID",
  example: "55",
  clean: util.types.toString,
});

export const createProductImageProductId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique numeric identifier for the product the new image will be attached to.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const createProductImageImageFile = input({
  label: "Image File",
  type: "string",
  required: true,
  comments:
    "The local path to the source image file to upload. Sent as multipart/form-data.",
  placeholder: "Enter file path",
  example: "/tmp/product-photo.jpg",
  clean: util.types.toString,
});

export const createProductImageImageUrl = input({
  label: "Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL of a remote image file to fetch and attach to the product. Maximum file size is 8MB.",
  placeholder: "Enter image URL",
  example: "https://cdn.example.com/images/product.png",
  clean: cleanString,
});

export const updateProductImageImageFile = input({
  label: "Image File",
  type: "string",
  required: false,
  comments:
    "The local path to a replacement image file to upload via multipart/form-data.",
  placeholder: "Enter file path",
  example: "/tmp/replacement-photo.jpg",
  clean: cleanString,
});

export const updateProductImageUrl = input({
  label: "Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL of a remote image to use as the new source for this image record. Must include protocol.",
  placeholder: "Enter image URL",
  example: "https://cdn.example.com/images/product-v2.png",
  clean: cleanString,
});

export const updateProductImageUrlZoom = input({
  label: "Zoom Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL for the high-resolution zoom variant displayed on hover.",
  placeholder: "Enter zoom image URL",
  example: "https://cdn.example.com/images/product-zoom.png",
  clean: cleanString,
});

export const updateProductImageUrlStandard = input({
  label: "Standard Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL for the standard-resolution image shown on product detail pages.",
  placeholder: "Enter standard image URL",
  example: "https://cdn.example.com/images/product-standard.png",
  clean: cleanString,
});

export const updateProductImageUrlThumbnail = input({
  label: "Thumbnail Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL for the small thumbnail used in category and search listings.",
  placeholder: "Enter thumbnail image URL",
  example: "https://cdn.example.com/images/product-thumb.png",
  clean: cleanString,
});

export const updateProductImageUrlTiny = input({
  label: "Tiny Image URL",
  type: "string",
  required: false,
  comments:
    "The fully qualified URL for the tiny image used in cart and minimal-space contexts.",
  placeholder: "Enter tiny image URL",
  example: "https://cdn.example.com/images/product-tiny.png",
  clean: cleanString,
});

export const updateProductImageIsThumbnail = input({
  label: "Is Thumbnail",
  type: "boolean",
  required: false,
  comments:
    "When true, marks this image as the product's primary thumbnail shown in listings.",
});

export const updateProductImageSortOrder = input({
  label: "Sort Order",
  type: "string",
  required: false,
  comments:
    "The display position for this image within the product gallery. Lower values appear first.",
  placeholder: "Enter sort order",
  example: "1",
  clean: cleanString,
});

export const updateProductImageDescription = input({
  label: "Image Description",
  type: "string",
  required: false,
  comments:
    "Alternative text and caption used by the storefront and assistive technologies for this image.",
  placeholder: "Enter image description",
  example: "Front view of the blue cotton t-shirt",
  clean: cleanString,
});

export const updateProductImageProductId = input({
  label: "Product ID for Image",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product that owns the image being updated.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const updateProductImageImageId = input({
  label: "Image ID to Update",
  type: "string",
  required: true,
  comments: "The unique identifier of the image record to modify.",
  placeholder: "Enter Image ID",
  example: "55",
  clean: util.types.toString,
});

export const deleteProductImageProductId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product that owns the image being deleted.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const deleteProductImageImageId = input({
  label: "Image ID to Delete",
  type: "string",
  required: true,
  comments: "The unique identifier of the image record to permanently remove.",
  placeholder: "Enter Image ID",
  example: "55",
  clean: util.types.toString,
});

export const getAllProductModifiersProductId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product whose modifier list will be retrieved.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const getAllProductModifiersPage = input({
  label: "Page",
  type: "string",
  required: false,
  comments:
    "The 1-based index of the page to retrieve from the paginated modifier list.",
  placeholder: "Enter page number",
  example: "1",
  clean: cleanString,
});

export const getAllProductModifiersLimit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of modifier records to return per page.",
  placeholder: "Enter limit",
  example: "50",
  clean: cleanString,
});

export const getAllProductModifiersIncludeFields = input({
  label: "Include Fields",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to keep on each modifier object.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const getAllProductModifiersExcludeFields = input({
  label: "Exclude Fields",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to omit. The ID cannot be excluded.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const getModifierStoreHash = input({
  label: "Store Hash",
  type: "string",
  required: true,
  comments:
    "The unique store identifier used in the API URL path. Find this in the store's API credentials.",
  placeholder: "Enter Store Hash",
  example: "abc12defg3",
  clean: util.types.toString,
});

export const getModifierProductId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the product that owns the modifier being retrieved.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const getModifierId = input({
  label: "Modifier ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the modifier record to retrieve.",
  placeholder: "Enter Modifier ID",
  example: "12",
  clean: util.types.toString,
});

export const getModifierIncludeFields = input({
  label: "Include Fields",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to keep on each modifier object.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const getModifierExcludeFields = input({
  label: "Exclude Fields",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of response fields to omit. The ID cannot be excluded.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const createModifierProductId = input({
  label: "Product ID",
  type: "text",
  required: true,
  comments:
    "The unique identifier of the product the new modifier will be attached to.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const createModifierType = input({
  label: "Modifier Type",
  type: "text",
  required: true,
  comments:
    "The input control type for the modifier. Acceptable values include date, checkbox, dropdown, radio_buttons, rectangles, swatch, product_list, file, text, multi_line_text, numbers_only_text.",
  placeholder: "Enter modifier type",
  example: "dropdown",
  clean: util.types.toString,
});

export const createModifierRequired = input({
  label: "Required",
  type: "boolean",
  required: true,
  comments:
    "When true, the shopper must select or fill in this modifier before checkout is allowed.",
});

export const createModifierSortOrder = input({
  label: "Sort Order",
  type: "text",
  required: false,
  comments:
    "The display position for this modifier on the product detail page. Lower values appear first.",
  placeholder: "Enter sort order",
  example: "1",
  clean: cleanString,
});

export const createModifierConfig = input({
  label: "Configuration",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON object containing type-specific configuration values for the modifier (e.g. default values, min/max, format).",
  example: JSON.stringify(
    {
      default_value: "",
      checked_by_default: false,
    },
    null,
    2,
  ),
});

export const createModifierOptionValues = input({
  label: "Option Values",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON array of selectable option values offered by this modifier. Used for dropdown, radio, rectangle, and swatch types.",
  example: JSON.stringify(
    [{ label: "Small", sort_order: 1, is_default: true }],
    null,
    2,
  ),
});

export const createModifierDisplayName = input({
  label: "Display Name",
  type: "text",
  required: true,
  comments:
    "The label shown to shoppers on the storefront when this modifier is rendered.",
  placeholder: "Enter display name",
  example: "Choose Size",
  clean: util.types.toString,
});

export const createModifierImageValueId = input({
  label: "Modifier Value ID",
  type: "text",
  required: true,
  comments:
    "The unique identifier of the modifier option value to attach the uploaded image to.",
  placeholder: "Enter Modifier Value ID",
  example: "21",
  clean: util.types.toString,
});

export const createModifierImageFile = input({
  label: "Modifier Image File",
  type: "data",
  required: true,
  comments:
    "The image file (GIF, JPEG, or PNG) to upload and associate with the modifier option value.",
  placeholder: "Select image file",
});

export const getProductVariantsPage = input({
  label: "Page Number",
  type: "text",
  required: false,
  comments:
    "The 1-based index of the page to retrieve from the paginated variant list.",
  placeholder: "Enter page number",
  example: "1",
  clean: cleanString,
});

export const getProductVariantsLimit = input({
  label: "Limit",
  type: "text",
  required: false,
  comments: "The maximum number of variant records to return per page.",
  placeholder: "Enter limit",
  example: "50",
  clean: cleanString,
});

export const getProductVariantsIncludeFields = input({
  label: "Include Fields",
  type: "text",
  required: false,
  comments:
    "A comma-separated list of response fields to keep on each variant object.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const getProductVariantsExcludeFields = input({
  label: "Exclude Fields",
  type: "text",
  required: false,
  comments:
    "A comma-separated list of response fields to omit from each variant object.",
  placeholder: "Enter fields separated by comma",
  clean: cleanString,
});

export const getProductVariantId = input({
  label: "Variant ID",
  type: "text",
  required: true,
  comments:
    "The unique identifier of the variant being retrieved, either on a product or an associated Price List Record.",
  placeholder: "Enter Variant ID",
  example: "201",
  clean: util.types.toString,
});

export const variantSKU = input({
  label: "Variant SKU",
  type: "text",
  required: true,
  comments:
    "The stock-keeping unit code for the variant. Must be between 1 and 255 characters and unique within the store.",
  placeholder: "Enter SKU",
  example: "TSHIRT-BLUE-M",
  clean: util.types.toString,
});

export const variantOptionValues = input({
  label: "Option Values",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of option/option-value ID pairs that together define this variant's attribute combination.",
  example: JSON.stringify(
    [{ id: 0, option_id: 0, option_display_name: "string", label: "string" }],
    null,
    2,
  ),
  clean: (optionValuesInput) => {
    if (!util.types.isJSON(util.types.toString(optionValuesInput))) {
      throw new Error("Invalid JSON provided for Option Values input.");
    }
    return JSON.parse(util.types.toString(optionValuesInput));
  },
});

export const variantPrice = input({
  label: "Variant Price",
  type: "text",
  required: true,
  comments:
    "The storefront selling price specific to this variant, overriding the parent product price.",
  placeholder: "Enter price",
  example: "29.99",
  clean: util.types.toString,
});

export const variantWeight = input({
  label: "Variant Weight",
  type: "text",
  required: true,
  comments:
    "The shipping weight specific to this variant, expressed in the store's configured weight unit.",
  placeholder: "Enter weight",
  example: "0.5",
  clean: util.types.toString,
});

export const variantWidth = input({
  label: "Variant Width",
  type: "text",
  required: true,
  comments:
    "The physical width specific to this variant, expressed in the store's configured length unit.",
  placeholder: "Enter width",
  example: "10",
  clean: util.types.toString,
});

export const variantHeight = input({
  label: "Variant Height",
  type: "text",
  required: true,
  comments:
    "The physical height specific to this variant, expressed in the store's configured length unit.",
  placeholder: "Enter height",
  example: "12",
  clean: util.types.toString,
});

export const variantDepth = input({
  label: "Variant Depth",
  type: "text",
  required: true,
  comments:
    "The physical depth specific to this variant, expressed in the store's configured length unit.",
  placeholder: "Enter depth",
  example: "2",
  clean: util.types.toString,
});

export const productInputId = input({
  label: "Product ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the parent product that owns the resource being operated on.",
  placeholder: "Enter Product ID",
  example: "102",
  clean: util.types.toString,
});

export const variantImageURL = input({
  label: "Image URL",
  type: "string",
  placeholder: "Enter a publicly accessible image URL (GIF, JPEG, or PNG)",
  required: false,
  comments:
    "The fully qualified URL of a remote image (GIF, JPEG, or PNG) to assign to this variant.",
  example: "https://cdn.example.com/images/variant.png",
  clean: cleanString,
});

export const webhookPageInput = input({
  label: "Page Number",
  type: "string",
  placeholder: "Enter the page number",
  required: false,
  comments:
    "The 1-based index of the page to retrieve from the paginated webhook list.",
  example: "1",
  clean: cleanString,
});

export const webhookLimitInput = input({
  label: "Items Per Page",
  type: "string",
  placeholder: "Enter the number of items per page",
  required: false,
  comments: "The maximum number of webhook records to return per page.",
  example: "50",
  clean: cleanString,
});

export const webhookIsActiveInput = input({
  label: "Is Active",
  type: "boolean",
  required: false,
  comments:
    "When true, restricts the result to webhooks that are currently enabled. When false, restricts to disabled webhooks.",
});

export const webhookScopeInput = input({
  label: "Scope",
  type: "string",
  placeholder: "Enter the scope to filter webhooks",
  required: false,
  comments:
    "The BigCommerce event scope that the webhook subscribes to (e.g. store/order/created).",
  example: "store/order/created",
  clean: cleanString,
});

export const webhookDestinationInput = input({
  label: "Destination",
  type: "string",
  placeholder: "Enter the destination to filter webhooks",
  required: false,
  comments:
    "The fully qualified HTTPS URL that BigCommerce will POST webhook events to.",
  example: "https://example.com/webhooks/bigcommerce",
  clean: cleanString,
});

export const webhookEventsHistoryEnabledInput = input({
  label: "Events History Enabled (Deprecated)",
  type: "boolean",
  required: false,
  comments:
    "Deprecated: when true, events that fail to deliver are retained for later replay.",
});

export const webhookHeadersInput = input({
  label: "Headers",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      "Custom-Header-1": "Value1",
      "Custom-Header-2": "Value2",
    },
    null,
    2,
  ),
  required: false,
  comments:
    "A JSON object of custom HTTP headers that BigCommerce will include on every webhook delivery request.",
  clean: util.types.toObject,
});

export const webhookIdInput = input({
  label: "Webhook ID",
  type: "string",
  placeholder: "Enter the ID of the webhook to update",
  required: true,
  comments: "The unique identifier of the webhook record being modified.",
  example: "12345",
  clean: util.types.toString,
});

export const instanceURLPatternInput = input({
  label: "Instance URL Pattern",
  type: "string",
  placeholder: "Enter a pattern to match against webhook destinations",
  required: true,
  comments:
    "A substring or pattern compared against webhook destination URLs to select which webhooks to operate on.",
  example: "example.com/webhooks",
  clean: util.types.toString,
});



const showNewOrders = input({
  label: "Show New Orders",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, orders created since the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedOrders = input({
  label: "Show Updated Orders",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, orders updated since the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});


export const pollChangesInputs = {
  bigCommerceConnection,
  storeHash,
  showNewOrders,
  showUpdatedOrders,
};
