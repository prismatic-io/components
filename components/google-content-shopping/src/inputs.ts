import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListInputClean } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Content Shopping connection to use.",
});

export const version = input({
  label: "API Version",
  type: "string",
  clean: util.types.toString,
  default: "v2.1",
  comments:
    "The API version to use. This is used to construct the base URL for the request.",
  example: "v2.1",
  placeholder: "Enter API version",
  required: false,
});

export const cloudTopicName = input({
  label: "Cloud Topic Name",
  type: "string",
  clean: util.types.toString,
  comments: "Cloud pub/sub topic to which notifications are sent (read-only).",
  example: "projects/my-project/topics/my-topic",
  placeholder: "Enter Cloud Pub/Sub topic name",
  required: false,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  clean: util.types.toInt,
  comments:
    "The maximum number of accounts to return in the response, used for paging.",
  example: "50",
  placeholder: "Enter Max Results",
  required: false,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  clean: util.types.toString,
  comments:
    "The token returned by the previous request's nextPageToken field. Used to retrieve the next page of results when pagination is required. Leave empty for the first request.",
  example: "CAESBggBIAEoAQ",
  placeholder: "Enter Page Token",
  required: false,
});

export const merchantId = input({
  label: "Merchant ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account.",
  example: "123456789",
  placeholder: "Enter Merchant ID",
  required: true,
});

export const productId = input({
  label: "Product ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The REST ID of the product in format channel:contentLanguage:targetCountry:offerId (e.g., online:en:US:1234567890). This is automatically generated when a product is created and must be used for updates, deletes, and retrievals.",
  example: "online:en:US:1234567890",
  placeholder: "Enter Product ID",
  required: true,
  dataSource: "selectProduct",
});

export const orderId = input({
  label: "Order ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Google-generated order ID. Found in the Merchant Center Orders dashboard or returned when listing orders. This ID is used to retrieve, update, or manage specific order details.",
  example: "12345678901234567890",
  placeholder: "Enter Order ID",
  required: true,
});

export const storeCode = input({
  label: "Store Code",
  type: "string",
  clean: util.types.toString,
  comments:
    "Store code that identifies a specific physical retail location. This code is defined when configuring stores in Merchant Center under Settings > Business information > Store codes. Used for local inventory management.",
  example: "STORE-NYC-001",
  placeholder: "Enter Store Code",
  required: true,
});

export const regionId = input({
  label: "Region ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The numeric ID identifying a specific geographic region defined in Merchant Center. Regions are configured under Settings > Shipping and returns and can represent custom geographic areas for regional inventory and pricing.",
  example: "12345",
  placeholder: "Enter Region ID",
  required: true,
});

export const returnId = input({
  label: "Return ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Google-generated merchant order return ID. Found in Merchant Center under Orders > Returns or returned when listing order returns. Used to retrieve, update, or process return details.",
  example: "1234567890123456",
  placeholder: "Enter Return ID",
  required: true,
});

export const operationId = input({
  label: "Operation ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of the operation. Unique across all operations for a given order.",
  example: "OP-123456",
  placeholder: "Enter Operation ID",
  required: false,
});

export const feedId = input({
  label: "Feed ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Content API Supplemental Feed ID. If present then product deletion applies to the data in a supplemental feed. If absent, entire product will be deleted.",
  example: "987654321",
  placeholder: "Enter Feed ID",
  required: false,
});

export const offerId = input({
  label: "Offer ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted.",
  example: "SKU-12345",
  placeholder: "Enter Offer ID",
  required: true,
});

export const title = input({
  label: "Title",
  type: "string",
  clean: util.types.toString,
  comments:
    "Title of the product. Should be descriptive and include key attributes like brand, product type, and distinguishing features. Maximum 150 characters recommended for optimal display in search results.",
  example: "Men's Organic Cotton T-Shirt - Blue",
  placeholder: "Enter Product Title",
  required: false,
});

export const description = input({
  label: "Description",
  type: "string",
  clean: util.types.toString,
  comments:
    "Detailed description of the product including materials, features, care instructions, and benefits. Should provide comprehensive information to help customers make purchasing decisions. Maximum 5,000 characters.",
  example:
    "100% organic cotton t-shirt with crew neck and short sleeves. Machine washable.",
  placeholder: "Enter Product Description",
  required: false,
});

export const link = input({
  label: "Link",
  type: "string",
  clean: util.types.toString,
  comments: "URL directly linking to your item's page on your website.",
  example: "https://www.example.com/products/organic-cotton-tshirt-blue",
  placeholder: "Enter Product URL",
  required: false,
});

export const imageLink = input({
  label: "Image Link",
  type: "string",
  clean: util.types.toString,
  comments: "URL of an image of the item.",
  example: "https://www.example.com/images/products/tshirt-blue-main.jpg",
  placeholder: "Enter Image URL",
  required: false,
});

export const contentLanguage = input({
  label: "Content Language",
  type: "string",
  clean: util.types.toString,
  comments: "The two-letter ISO 639-1 language code for the item.",
  example: "en",
  placeholder: "Enter Language Code",
  required: true,
});

export const targetCountry = input({
  label: "Target Country",
  type: "string",
  clean: util.types.toString,
  comments: "The CLDR territory code for the item's country of sale.",
  example: "US",
  placeholder: "Enter Country Code",
  required: true,
});

export const feedLabel = input({
  label: "Feed Label",
  type: "string",
  clean: util.types.toString,
  comments:
    "Feed label for the item. Either targetCountry or feedLabel is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
  example: "US-FEED-001",
  placeholder: "Enter Feed Label",
  required: false,
});

export const expirationDate = input({
  label: "Expiration Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in productstatuses as googleExpirationDate and might be earlier if expirationDate is too far in the future.",
  example: "2024-12-31",
  placeholder: "Enter Expiration Date (YYYY-MM-DD)",
  required: false,
});

export const disclosureDate = input({
  label: "Disclosure Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The date time when an offer becomes visible in search results across Google's YouTube surfaces, in ISO 8601 format. See Disclosure date for more information.",
  example: "2024-06-15",
  placeholder: "Enter Disclosure Date (YYYY-MM-DD)",
  required: false,
});

export const adult = input({
  label: "Adult",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, indicates the item is targeted towards adults.",
  required: false,
});

export const fullChargeReturnShippingCost = input({
  label: "Full Charge Return Shipping Cost",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the customer will be charged for return shipping costs.",
  required: false,
});

export const brand = input({
  label: "Brand",
  type: "string",
  clean: util.types.toString,
  comments:
    "Brand name of the product manufacturer or designer. Required for products with GTIN unless the product is custom-made or a media item (books, movies, music). Maximum 70 characters.",
  example: "ExampleBrand",
  placeholder: "Enter Brand Name",
  required: false,
});

export const color = input({
  label: "Color",
  type: "string",
  clean: util.types.toString,
  comments:
    "Primary color of the product. Use standardized color names (e.g., 'Blue', 'Navy Blue', 'Red') for consistency. For variants with multiple colors, create separate products with the same itemGroupId. Maximum 100 characters.",
  example: "Blue",
  placeholder: "Enter Color",
  required: false,
});

export const googleProductCategory = input({
  label: "Google Product Category",
  type: "string",
  clean: util.types.toString,
  comments:
    "Google's category of the item (see Google product taxonomy). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API.",
  example: "Apparel & Accessories > Clothing > Shirts",
  placeholder: "Enter Google Product Category",
  required: false,
});

export const gtin = input({
  label: "GTIN",
  type: "string",
  clean: util.types.toString,
  comments: "Global Trade Item Number (GTIN) of the item.",
  example: "00012345678905",
  placeholder: "Enter GTIN",
  required: false,
});

export const itemGroupId = input({
  label: "Item Group ID",
  type: "string",
  clean: util.types.toString,
  comments: "Shared identifier for all variants of the same product.",
  example: "TSHIRT-GROUP-001",
  placeholder: "Enter Item Group ID",
  required: false,
});

export const material = input({
  label: "Material",
  type: "string",
  clean: util.types.toString,
  comments:
    "Primary material composition of the product (e.g., Cotton, Polyester, Leather, Wood). Particularly important for apparel, home goods, and furniture. Can include multiple materials separated by slashes (e.g., 'Cotton/Polyester'). Maximum 200 characters.",
  example: "Cotton",
  placeholder: "Enter Material",
  required: false,
});

export const mpn = input({
  label: "MPN",
  type: "string",
  clean: util.types.toString,
  comments: "Manufacturer Part Number (MPN) of the item.",
  example: "MPN-12345-A",
  placeholder: "Enter MPN",
  required: false,
});

export const pattern = input({
  label: "Pattern",
  type: "string",
  clean: util.types.toString,
  comments:
    "Visual pattern or print design on the product (e.g., Solid, Striped, Polka Dots, Plaid, Floral). Most relevant for apparel, home textiles, and decorative items. Maximum 100 characters.",
  example: "Solid",
  placeholder: "Enter Pattern",
  required: false,
});

export const identifierExists = input({
  label: "Identifier Exists",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, indicates that an identifier (GTIN, MPN, or brand) exists for the product. Set to false for custom or handmade products.",
  required: true,
});

export const salePriceEffectiveDate = input({
  label: "Sale Price Effective Date",
  type: "string",
  clean: util.types.toString,
  comments: "Date range during which the item is on sale",
  example: "2024-11-01T00:00:00Z/2024-11-30T23:59:59Z",
  placeholder: "Enter Date Range (ISO 8601 Format)",
  required: false,
});

export const multipack = input({
  label: "Multipack",
  type: "string",
  clean: util.types.toString,
  comments: "The number of identical products in a merchant-defined multipack.",
  example: "6",
  placeholder: "Enter Multipack Quantity",
  required: false,
});

export const customLabel0 = input({
  label: "Custom Label 0",
  type: "string",
  clean: util.types.toString,
  comments:
    "Custom Label 0 for custom grouping of items in a Shopping campaign.",
  example: "Summer Collection",
  placeholder: "Enter Custom Label 0",
  required: false,
});

export const customLabel1 = input({
  label: "Custom Label 1",
  type: "string",
  clean: util.types.toString,
  comments:
    "Custom Label 1 for custom grouping of items in a Shopping campaign.",
  example: "Bestseller",
  placeholder: "Enter Custom Label 1",
  required: false,
});

export const customLabel2 = input({
  label: "Custom Label 2",
  type: "string",
  clean: util.types.toString,
  comments:
    "Custom Label 2 for custom grouping of items in a Shopping campaign.",
  example: "Clearance",
  placeholder: "Enter Custom Label 2",
  required: false,
});

export const customLabel3 = input({
  label: "Custom Label 3",
  type: "string",
  clean: util.types.toString,
  comments:
    "Custom Label 3 for custom grouping of items in a Shopping campaign.",
  example: "Premium",
  placeholder: "Enter Custom Label 3",
  required: false,
});

export const customLabel4 = input({
  label: "Custom Label 4",
  type: "string",
  clean: util.types.toString,
  comments:
    "Custom Label 4 for custom grouping of items in a Shopping campaign.",
  example: "Limited Edition",
  placeholder: "Enter Custom Label 4",
  required: false,
});

export const isBundle = input({
  label: "Is Bundle",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, indicates the item is a merchant-defined bundle (a custom grouping of different products sold for a single price).",
  required: false,
});

export const mobileLink = input({
  label: "Mobile Link",
  type: "string",
  clean: util.types.toString,
  comments: "URL for the mobile-optimized version of your item's landing page.",
  example: "https://m.example.com/products/organic-cotton-tshirt-blue",
  placeholder: "Enter Mobile URL",
  required: false,
});

export const availabilityDate = input({
  label: "Availability Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The day a pre-ordered product becomes available for delivery, in ISO 8601 format.",
  example: "2024-07-01",
  placeholder: "Enter Availability Date (YYYY-MM-DD)",
  required: false,
});

export const shippingLabel = input({
  label: "Shipping Label",
  type: "string",
  clean: util.types.toString,
  comments:
    "The shipping label of the product, used to group product in account-level shipping rules.",
  example: "STANDARD-SHIPPING",
  placeholder: "Enter Shipping Label",
  required: false,
});

export const displayAdsId = input({
  label: "Display Ads ID",
  type: "string",
  clean: util.types.toString,
  comments: "An identifier for an item for dynamic remarketing campaigns.",
  example: "RMK-12345",
  placeholder: "Enter Display Ads ID",
  required: false,
});

export const displayAdsTitle = input({
  label: "Display Ads Title",
  type: "string",
  clean: util.types.toString,
  comments: "Title of an item for dynamic remarketing campaigns.",
  example: "Men's Blue T-Shirt",
  placeholder: "Enter Display Ads Title",
  required: false,
});

export const displayAdsLink = input({
  label: "Display Ads Link",
  type: "string",
  clean: util.types.toString,
  comments:
    "URL directly to your item's landing page for dynamic remarketing campaigns.",
  example: "https://www.example.com/products/tshirt-blue",
  placeholder: "Enter Display Ads URL",
  required: false,
});

export const displayAdsValue = input({
  label: "Display Ads Value",
  type: "string",
  clean: util.types.toInt,
  comments: "Offer margin for dynamic remarketing campaigns.",
  example: "10",
  placeholder: "Enter Display Ads Value",
  required: false,
});

export const batchId = input({
  label: "Batch ID",
  type: "string",
  clean: util.types.toInt,
  comments: "The ID of the request entry this entry responds to.",
  example: "1",
  placeholder: "Enter Batch ID",
  required: true,
});

export const sellOnGoogleQuantity = input({
  label: "Sell On Google Quantity",
  type: "string",
  clean: util.types.toString,
  comments:
    "The quantity of the product that is available for selling on Google. Supported only for online products.",
  example: "100",
  placeholder: "Enter Quantity Available for Google",
  required: false,
});

export const quantity = input({
  label: "Quantity",
  type: "string",
  clean: util.types.toInt,
  comments: "Quantity of the product. Must be nonnegative.",
  example: "50",
  placeholder: "Enter Quantity",
  required: false,
});

export const instoreProductLocation = input({
  label: "Instore Product Location",
  type: "string",
  clean: util.types.toString,
  comments: "In-store product location.",
  example: "Aisle 5, Shelf B",
  placeholder: "Enter In-Store Location",
  required: false,
});

export const maxHandlingTime = input({
  label: "Max Handling Time",
  type: "string",
  clean: util.types.toString,
  comments: "Maximal product handling time (in business days).",
  example: "3",
  placeholder: "Enter Maximum Handling Time",
  required: false,
});

export const minHandlingTime = input({
  label: "Min Handling Time",
  type: "string",
  clean: util.types.toString,
  comments: "Minimal product handling time (in business days).",
  example: "1",
  placeholder: "Enter Minimum Handling Time",
  required: false,
});

export const adsGrouping = input({
  label: "Ads Grouping",
  type: "string",
  clean: util.types.toString,
  comments:
    "Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise.",
  example: "GROUP-A",
  placeholder: "Enter Ads Grouping",
  required: false,
});

export const adsRedirect = input({
  label: "Ads Redirect",
  type: "string",
  clean: util.types.toString,
  comments:
    "Allows advertisers to override the item URL when the product is shown within the context of Product Ads.",
  example: "https://www.example.com/ads/tshirt-blue",
  placeholder: "Enter Ads Redirect URL",
  required: false,
});

export const ageGroup = input({
  label: "Age Group",
  type: "string",
  clean: util.types.toString,
  comments: "Target age group of the item.",
  example: "adult",
  placeholder: "Enter Age Group",
  required: false,
});

export const availability = input({
  label: "Availability",
  type: "string",
  clean: util.types.toString,
  comments:
    "Current availability status of the product. Valid values: 'in stock' (available for immediate purchase), 'out of stock' (temporarily unavailable), 'preorder' (available for advance orders), 'backorder' (can be ordered but delayed delivery).",
  example: "in stock",
  placeholder: "Enter Availability Status",
  required: false,
});

export const condition = input({
  label: "Condition",
  type: "string",
  clean: util.types.toString,
  comments:
    "Physical condition of the product. Valid values: 'new' (brand new, unopened), 'refurbished' (professionally restored to working condition), 'used' (previously owned or opened). Required for all products.",
  example: "new",
  placeholder: "Enter Condition",
  required: false,
});

export const gender = input({
  label: "Gender",
  type: "string",
  clean: util.types.toString,
  comments: "Target gender of the item.",
  example: "unisex",
  placeholder: "Enter Gender",
  required: false,
});

export const sizeSystem = input({
  label: "Size System",
  type: "string",
  clean: util.types.toString,
  comments:
    "System in which the size is specified. Recommended for apparel items.",
  example: "US",
  placeholder: "Enter Size System",
  required: false,
});

export const sizeType = input({
  label: "Size Type",
  type: "string",
  clean: util.types.toString,
  comments: "The cut of the item. Recommended for apparel items.",
  example: "regular",
  placeholder: "Enter Size Type",
  required: false,
});

export const additionalSizeType = input({
  label: "Additional Size Type",
  type: "string",
  clean: util.types.toString,
  comments:
    "Additional cut of the item. Used together with sizeType to represent combined size types for apparel items.",
  example: "tall",
  placeholder: "Enter Additional Size Type",
  required: false,
});

export const energyEfficiencyClass = input({
  label: "Energy Efficiency Class",
  type: "string",
  clean: util.types.toString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A++",
  placeholder: "Enter Energy Efficiency Class",
  required: false,
});

export const minEnergyEfficiencyClass = input({
  label: "Min Energy Efficiency Class",
  type: "string",
  clean: util.types.toString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A+",
  placeholder: "Enter Minimum Energy Efficiency Class",
  required: false,
});

export const maxEnergyEfficiencyClass = input({
  label: "Max Energy Efficiency Class",
  type: "string",
  clean: util.types.toString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A+++",
  placeholder: "Enter Maximum Energy Efficiency Class",
  required: false,
});

export const taxCategory = input({
  label: "Tax Category",
  type: "string",
  clean: util.types.toString,
  comments: "The tax category of the product.",
  example: "apparel",
  placeholder: "Enter Tax Category",
  required: false,
});

export const transitTimeLabel = input({
  label: "Transit Time Label",
  type: "string",
  clean: util.types.toString,
  comments:
    "The transit time label of the product, used to group product in account-level transit time tables.",
  example: "STANDARD",
  placeholder: "Enter Transit Time Label",
  required: false,
});

export const linkTemplate = input({
  label: "Link Template",
  type: "string",
  clean: util.types.toString,
  comments: "URL template for merchant hosted local storefront.",
  example: "https://www.example.com/store/{store_code}/product/{product_id}",
  placeholder: "Enter Link Template",
  required: false,
});

export const mobileLinkTemplate = input({
  label: "Mobile Link Template",
  type: "string",
  clean: util.types.toString,
  comments:
    "URL template for merchant hosted local storefront optimized for mobile devices.",
  example: "https://m.example.com/store/{store_code}/product/{product_id}",
  placeholder: "Enter Mobile Link Template",
  required: false,
});

export const canonicalLink = input({
  label: "Canonical Link",
  type: "string",
  clean: util.types.toString,
  comments: "URL for the canonical version of your item's landing page.",
  example: "https://www.example.com/products/tshirt-blue",
  placeholder: "Enter Canonical URL",
  required: false,
});

export const updateMask = input({
  label: "Update Mask",
  type: "string",
  clean: util.types.toString,
  comments:
    "Comma-separated list of product attributes to update. Attributes in the mask without values will be deleted. Only top-level attributes can be updated.",
  example: "title,salePrice",
  placeholder: "Enter Field Names (Comma-Separated)",
  required: false,
});

export const externalSellerId = input({
  label: "External Seller ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Required for multi-seller accounts. Use this attribute if you're a marketplace uploading products for various sellers to your multi-seller account.",
  example: "EXTERNAL-SELLER-789",
  placeholder: "Enter External Seller ID",
  required: true,
});

export const placedDateStart = input({
  label: "Placed Date Start",
  type: "string",
  clean: util.types.toString,
  comments:
    "Obtains orders placed after this date (inclusively), in ISO 8601 format.",
  example: "2024-01-01T00:00:00Z",
  placeholder: "Enter Start Date (ISO 8601 Format)",
  required: false,
});

export const placedDateEnd = input({
  label: "Placed Date End",
  type: "string",
  clean: util.types.toString,
  comments:
    "Obtains orders placed before this date (inclusively), in ISO 8601 format.",
  example: "2024-12-31T23:59:59Z",
  placeholder: "Enter End Date (ISO 8601 Format)",
  required: false,
});

export const reasonText = input({
  label: "Reason Text",
  type: "string",
  clean: util.types.toString,
  comments: "The explanation of the reason.",
  example: "Customer requested cancellation",
  placeholder: "Enter Reason Text",
  required: false,
});

export const createdStartDate = input({
  label: "Created Start Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "Obtains order returns created after this date (inclusively), in ISO 8601 format.",
  example: "2024-01-01T00:00:00Z",
  placeholder: "Enter Start Date (ISO 8601 Format)",
  required: false,
});

export const createdEndDate = input({
  label: "Created End Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "Obtains order returns created before this date (inclusively), in ISO 8601 format.",
  example: "2024-12-31T23:59:59Z",
  placeholder: "Enter End Date (ISO 8601 Format)",
  required: false,
});

export const acknowledged = input({
  label: "Acknowledged",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, filters for orders that have been acknowledged. When false, filters for orders that have not been acknowledged.",
  required: false,
});

export const returnMethodType = input({
  label: "Return Method Type",
  type: "string",
  clean: util.types.toString,
  comments: "The way of the package being returned.",
  example: "SHIP_TO_MERCHANT",
  placeholder: "Enter Return Method Type",
  required: false,
});

export const orderBy = input({
  label: "Order By",
  type: "string",
  clean: util.types.toString,
  comments: "Order results by placement date in descending or ascending order.",
  placeholder: "Select sort order",
  model: [
    {
      label: "PLACED DATE ASC",
      value: "placedDateAsc",
    },
    {
      label: "PLACED DATE DESC",
      value: "placedDateDesc",
    },
  ],
  required: false,
});

export const pause = input({
  label: "Pause",
  type: "string",
  clean: util.types.toString,
  comments: "Publication of this item should be temporarily paused.",
  placeholder: "Select pause option",
  model: [
    {
      label: "ADS",
      value: "ads",
    },
  ],
  required: false,
});

export const pickupMethod = input({
  label: "Pickup Method",
  type: "string",
  clean: util.types.toString,
  comments: "The pick up option for the item.",
  placeholder: "Select pickup method",
  model: [
    {
      label: "BUY",
      value: "buy",
    },
    {
      label: "RESERVE",
      value: "reserve",
    },
    {
      label: "SHIP TO STORE",
      value: "ship to store",
    },
    {
      label: "NOT SUPPORTED",
      value: "not supported",
    },
  ],
  required: false,
});

export const pickupSla = input({
  label: "Pickup Sla",
  type: "string",
  clean: util.types.toString,
  comments: "Item store pickup timeline.",
  placeholder: "Select pickup SLA",
  model: [
    {
      label: "SAME DAY",
      value: "same day",
    },
    {
      label: "NEXT DAY",
      value: "next day",
    },
    {
      label: "2 DAY",
      value: "2-day",
    },
    {
      label: "3 DAY",
      value: "3-day",
    },
    {
      label: "4 DAY",
      value: "4-day",
    },
    {
      label: "5 DAY",
      value: "5-day",
    },
    {
      label: "6 DAY",
      value: "6-day",
    },
    {
      label: "7 DAY",
      value: "7-day",
    },
    {
      label: "MULTI WEEK",
      value: "multi-week",
    },
  ],
  required: false,
});

export const source = input({
  label: "Source",
  type: "string",
  clean: util.types.toString,
  comments: "The source of the offer, that is, how the offer was created.",
  placeholder: "Select source",
  model: [
    {
      label: "API",
      value: "api",
    },
    {
      label: "CRAWL",
      value: "crawl",
    },
    {
      label: "FEED",
      value: "feed",
    },
  ],
  required: false,
});

export const method = input({
  label: "Batch Method",
  type: "string",
  clean: util.types.toString,
  comments: "The method of the batch entry.",
  placeholder: "Select method",
  required: true,
  model: [
    {
      label: "DELETE",
      value: "delete",
    },
    {
      label: "GET",
      value: "get",
    },
    {
      label: "INSERT",
      value: "insert",
    },
    {
      label: "UPDATE",
      value: "update",
    },
  ],
});

export const price = input({
  label: "Price",
  type: "code",
  language: "json",
  comments:
    "Price of the product as an object with 'value' (as string) and 'currency' (ISO 4217 code). This is the regular price before any discounts. Required for online products unless they are out of stock.",
  example: JSON.stringify(
    {
      value: "29.99",
      currency: "USD",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const salePrice = input({
  label: "Sale Price",
  type: "code",
  language: "json",
  comments:
    "Discounted sale price as an object with 'value' (as string) and 'currency' (ISO 4217 code). Must be lower than the regular price. Use with salePriceEffectiveDate to specify when the sale is active.",
  example: JSON.stringify(
    {
      value: "24.99",
      currency: "USD",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const productHeight = input({
  label: "Product Height",
  type: "code",
  language: "json",
  comments:
    "The height of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive).",
  example: JSON.stringify(
    {
      value: 10.5,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const productLength = input({
  label: "Product Length",
  type: "code",
  language: "json",
  comments:
    "The length of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive).",
  example: JSON.stringify(
    {
      value: 12.0,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const productWidth = input({
  label: "Product Width",
  type: "code",
  language: "json",
  comments:
    "The width of the product in the units provided. The value must be between 0 (exclusive) and 3000 (inclusive).",
  example: JSON.stringify(
    {
      value: 8.0,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const productWeight = input({
  label: "Product Weight",
  type: "code",
  language: "json",
  comments:
    "The weight of the product in the units provided. The value must be between 0 (exclusive) and 2000 (inclusive).",
  example: JSON.stringify(
    {
      value: 0.5,
      unit: "lb",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const installment = input({
  label: "Installment",
  type: "code",
  language: "json",
  comments: "Number and amount of installments to pay for an item.",
  example: JSON.stringify(
    {
      months: "12",
      amount: {
        value: "25.00",
        currency: "USD",
      },
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const loyaltyPoints = input({
  label: "Loyalty Points",
  type: "code",
  language: "json",
  comments:
    "Loyalty points that users receive after purchasing the item. Japan only.",
  example: JSON.stringify(
    {
      name: "Reward Points",
      pointsValue: "100",
      ratio: 1.0,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const shipping = input({
  label: "Shipping",
  type: "code",
  language: "json",
  comments:
    "Array of product-specific shipping rules that override account-level settings. Each rule can specify price, country, region, service class, and handling/transit times. Use this to define unique shipping costs for oversized items, expedited shipping, or region-specific rates.",
  example: JSON.stringify(
    [
      {
        price: {
          value: "5.99",
          currency: "USD",
        },
        country: "US",
        region: "CA",
        service: "Standard",
        minHandlingTime: "1",
        maxHandlingTime: "3",
        minTransitTime: "3",
        maxTransitTime: "7",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const unitPricingMeasure = input({
  label: "Unit Pricing Measure",
  type: "code",
  language: "json",
  comments: "The measure and dimension of an item.",
  example: JSON.stringify(
    {
      value: 16,
      unit: "oz",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const unitPricingBaseMeasure = input({
  label: "Unit Pricing Base Measure",
  type: "code",
  language: "json",
  comments: "The preference of the denominator of the unit price.",
  example: JSON.stringify(
    {
      value: 1,
      unit: "oz",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const shippingLength = input({
  label: "Shipping Length",
  type: "code",
  language: "json",
  comments: "Length of the item for shipping.",
  example: JSON.stringify(
    {
      value: 12.0,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const shippingWidth = input({
  label: "Shipping Width",
  type: "code",
  language: "json",
  comments: "Width of the item for shipping.",
  example: JSON.stringify(
    {
      value: 8.0,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const shippingHeight = input({
  label: "Shipping Height",
  type: "code",
  language: "json",
  comments: "Height of the item for shipping.",
  example: JSON.stringify(
    {
      value: 3.0,
      unit: "in",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const registeredEvents = input({
  label: "Registered Events",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "List of event types.",
  example: "product.create",
  placeholder: "Enter Event Types",
  clean: valueListInputClean,
});

export const shipmentTypes = input({
  label: "Shipment Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment type provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment types.",
  example: "STANDARD",
  placeholder: "Enter Shipment Types",
  clean: valueListInputClean,
});

export const shipmentStatus = input({
  label: "Shipment Status",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment status provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment statuses.",
  example: "DELIVERED",
  placeholder: "Enter Shipment Statuses",
  clean: valueListInputClean,
});

export const shipmentStates = input({
  label: "Shipment States",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns that match any shipment state provided in this parameter. When this parameter is not provided, order returns are obtained regardless of their shipment states.",
  example: "SHIPPED",
  placeholder: "Enter Shipment States",
  clean: valueListInputClean,
});

export const googleOrderIds = input({
  label: "Google Order IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns with the specified order ids. If this parameter is provided, createdStartDate, createdEndDate, shipmentType, shipmentStatus, shipmentState and acknowledged parameters must be not set. Note: if googleOrderId and shipmentTrackingNumber parameters are provided, the obtained results will include all order returns that either match the specified order id or the specified tracking number.",
  example: "12345678901234567890",
  placeholder: "Enter Google Order IDs",
  clean: valueListInputClean,
});

export const shipmentTrackingNumbers = input({
  label: "Shipping Tracking Numbers",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains order returns with the specified tracking numbers. If this parameter is provided, createdStartDate, createdEndDate, shipmentType, shipmentStatus, shipmentState and acknowledged parameters must be not set. Note: if googleOrderId and shipmentTrackingNumber parameters are provided, the obtained results will include all order returns that either match the specified order id or the specified tracking number.",
  example: "1Z999AA10123456784",
  placeholder: "Enter Tracking Numbers",
  clean: valueListInputClean,
});

export const displayAdsSimilarIds = input({
  label: "Display Ads Similar IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Advertiser-specified recommendations.",
  example: "SKU-67890",
  placeholder: "Enter Similar Product IDs",
  clean: valueListInputClean,
});

export const promotionIds = input({
  label: "Promotion IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The unique ID of a promotion.",
  example: "SUMMER2024",
  placeholder: "Enter Promotion IDs",
  clean: valueListInputClean,
});

export const includedDestinations = input({
  label: "Included Destinations",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The list of destinations to include for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in excludedDestinations.",
  example: "Shopping",
  placeholder: "Enter Included Destinations",
  clean: valueListInputClean,
});

export const excludedDestinations = input({
  label: "Excluded Destinations",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The list of destinations to exclude for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted.",
  example: "DisplayAds",
  placeholder: "Enter Excluded Destinations",
  clean: valueListInputClean,
});

export const adsLabels = input({
  label: "Ads Labels",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Similar to adsGrouping, but only works on CPC.",
  example: "LABEL-A",
  placeholder: "Enter Ads Labels",
  clean: valueListInputClean,
});

export const productTypes = input({
  label: "Product Types",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Categories of the item (formatted as in product data specification).",
  example: "Apparel & Accessories > Clothing > Shirts",
  placeholder: "Enter Product Type Categories",
  clean: valueListInputClean,
});

export const sizes = input({
  label: "Sizes",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same itemGroupId value",
  example: "M",
  placeholder: "Enter Size",
  clean: valueListInputClean,
});

export const shoppingAdsExcludedCountries = input({
  label: "Shopping Ads Excluded Countries",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "products.list of country codes (ISO 3166-1 alpha-2) to exclude the offer from Shopping Ads destination. Countries from this list are removed from countries configured in MC feed settings.",
  example: "FR",
  placeholder: "Enter Country Codes",
  clean: valueListInputClean,
});

export const statuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Obtains orders that match any of the specified statuses. <strong>Note:</strong> 'active' is a shortcut for pendingShipment and partiallyShipped; 'completed' is a shortcut for shipped, delivered, returned, and canceled.",
  example: "active",
  placeholder: "Select order statuses",
  clean: valueListInputClean,
});

export const taxes = input({
  label: "Taxes",
  type: "code",
  language: "json",
  comments:
    "Array of product-specific tax rules that override account-level settings. Each rule defines the tax rate, applicable country/region, whether to tax shipping, and location identifiers. Use this for products with unique tax requirements (e.g., reduced rates for essential goods).",
  example: JSON.stringify([
    {
      rate: "number",
      country: "string",
      region: "string",
      taxShip: false,
      locationId: "string",
      postalCode: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const shippingWeight = input({
  label: "Shipping Weight",
  type: "code",
  language: "json",
  comments: "Weight of the item for shipping.",
  example: JSON.stringify({
    value: "number",
    unit: "string",
  }),
  clean: jsonInputClean,
});

export const customAttributes = input({
  label: "Custom Attributes",
  type: "code",
  language: "json",
  comments:
    "A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, { 'name': 'size type', 'value': 'regular' }). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions).",
  example: JSON.stringify([
    {
      name: "string",
      value: "string",
      groupValues: [
        {
          name: "string",
          value: "string",
        },
      ],
    },
  ]),
  clean: jsonInputClean,
});

export const cloudExportAdditionalProperties = input({
  label: "Cloud Export Additional Properties",
  type: "code",
  language: "json",
  comments: "Extra fields to export to the Cloud Retail program.",
  example: JSON.stringify([
    {
      propertyName: "string",
      textValue: ["string"],
      boolValue: false,
      intValue: ["string"],
      floatValue: ["number"],
      minValue: "number",
      maxValue: "number",
      unitCode: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const reason = input({
  label: "Reason",
  type: "string",
  clean: util.types.toString,
  comments: "The reason for the cancellation.",
  placeholder: "Select cancellation reason",
  required: false,
  model: [
    {
      label: "customerInitiatedCancel",
      value: "customerInitiatedCancel",
    },
    {
      label: "invalidCoupon",
      value: "invalidCoupon",
    },
    {
      label: "malformedShippingAddress",
      value: "malformedShippingAddress",
    },
    {
      label: "noInventory",
      value: "noInventory",
    },
    {
      label: "other",
      value: "other",
    },
    {
      label: "priceError",
      value: "priceError",
    },
    {
      label: "shippingPriceError",
      value: "shippingPriceError",
    },
    {
      label: "taxError",
      value: "taxError",
    },
    {
      label: "undeliverableShippingAddress",
      value: "undeliverableShippingAddress",
    },
    {
      label: "unsupportedPoBoxAddress",
      value: "unsupportedPoBoxAddress",
    },
    {
      label: "failedToCaptureFunds",
      value: "failedToCaptureFunds",
    },
  ],
});

export const channel = input({
  label: "Channel",
  type: "string",
  clean: util.types.toString,
  comments:
    "The sales channel for this product. 'online' for products sold through your website with shipping, 'local' for products available at physical store locations for local pickup or in-store purchase. Part of the product ID format.",
  placeholder: "Select channel",
  required: true,
  model: [
    {
      label: "Online",
      value: "online",
    },
    {
      label: "Local",
      value: "local",
    },
  ],
});

export const additionalImageLinks = input({
  label: "Additional Image Links",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Additional URLs of images of the item.",
  example: "https://www.example.com/images/products/tshirt-blue-side.jpg",
  placeholder: "Enter Image URLs",
  clean: valueListInputClean,
});

export const lifestyleImageLinks = input({
  label: "Lifestyle Image Links",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase your item in a real-world context.",
  example: "https://www.example.com/images/lifestyle/tshirt-lifestyle-1.jpg",
  placeholder: "Enter Lifestyle Image URLs",
  clean: valueListInputClean,
});

export const costOfGoodsSold = input({
  label: "Cost Of Goods Sold",
  type: "code",
  language: "json",
  comments: "Cost of goods sold. Used for gross profit reporting.",
  example: JSON.stringify({
    value: "string",
    currency: "string",
  }),
  clean: jsonInputClean,
});

export const productDetails = input({
  label: "Product Details",
  type: "code",
  language: "json",
  comments: "Technical specification or additional product details.",
  example: JSON.stringify([
    {
      sectionName: "string",
      attributeName: "string",
      attributeValue: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const subscriptionCost = input({
  label: "Subscription Cost",
  type: "code",
  language: "json",
  comments:
    "Number of periods (months or years) and amount of payment per period for an item with an associated subscription contract.",
  example: JSON.stringify({
    period: "string",
    periodLength: "string",
    amount: {
      value: "string",
      currency: "string",
    },
  }),
  clean: jsonInputClean,
});

export const view = input({
  label: "View",
  type: "string",
  clean: util.types.toString,
  comments:
    "Controls which fields will be populated. Acceptable values are: 'merchant' and 'css'. The default value is 'merchant'.",
  placeholder: "Select view",
  model: [
    {
      label: "Merchant",
      value: "merchant",
    },
    {
      label: "CSS",
      value: "css",
    },
  ],
  required: false,
});

export const label = input({
  label: "Label",
  type: "string",
  clean: util.types.toString,
  comments:
    "If view is set to 'css', only return accounts that are assigned label with given ID.",
  example: "12345",
  placeholder: "Enter Label ID",
  required: false,
});

export const name = input({
  label: "Name",
  type: "string",
  clean: util.types.toString,
  comments:
    "If set, only the accounts with the given name (case sensitive) will be returned.",
  example: "My Account Name",
  placeholder: "Enter Account Name",
  required: false,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Merchant Center account ID. For single merchant accounts, this is the same as merchantId. For multi-client accounts, this represents a specific sub-account ID. Found in Merchant Center settings.",
  example: "987654321",
  placeholder: "Enter Account ID",
  required: true,
  dataSource: "selectAccount",
});

export const kind = input({
  label: "Kind",
  type: "string",
  clean: util.types.toString,
  comments:
    "Identifies what kind of resource this is. Value: the fixed string 'content#account'.",
  example: "content#account",
  placeholder: "Enter Kind",
  required: true,
});

export const websiteUrl = input({
  label: "Website Url",
  type: "string",
  clean: util.types.toString,
  comments: "The merchant's website.",
  example: "https://www.example.com",
  placeholder: "Enter Website URL",
  required: true,
});

export const adultContent = input({
  label: "Adult Content",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, indicates the merchant sells adult content.",
  required: true,
});

export const sellerId = input({
  label: "Seller ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Client-specific, locally-unique, internal ID for the child account.",
  example: "SELLER-12345",
  placeholder: "Enter Seller ID",
  required: true,
});

export const cssId = input({
  label: "CSS ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "ID of the CSS (Comparison Shopping Service) that the account belongs to. CSS is a program allowing third-party shopping comparison services to display product listings. Only applicable for CSS-managed accounts.",
  example: "98765",
  placeholder: "Enter CSS ID",
  required: true,
});

export const labelIds = input({
  label: "Label IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Manually created label IDs that are assigned to the account by CSS.",
  example: "12345",
  placeholder: "Enter Label IDs",
  clean: valueListInputClean,
});

export const productHighlights = input({
  label: "Product Highlights",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Bullet points describing the most relevant highlights of a product.",
  example: "Made from 100% organic cotton",
  placeholder: "Enter Product Highlights",
  clean: valueListInputClean,
});

export const accountManagement = input({
  label: "Account Management",
  type: "string",
  clean: util.types.toString,
  comments: "Specifies whether account management is manual or automatic.",
  placeholder: "Select management type",
  model: [
    {
      label: "Manual",
      value: "manual",
    },
    {
      label: "Automatic",
      value: "automatic",
    },
  ],
  required: false,
});

export const automaticLabelIds = input({
  label: "Automatic Label IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Automatically created label IDs that are assigned to the account by CSS Center.",
  example: "67890",
  placeholder: "Enter Automatic Label IDs",
  clean: valueListInputClean,
});

export const users = input({
  label: "User",
  type: "code",
  language: "json",
  comments:
    "Users with access to the account. Every account (except for subaccounts) must have at least one admin user.",
  example: JSON.stringify([
    {
      emailAddress: "string",
      admin: true,
      orderManager: false,
      paymentsManager: false,
      paymentsAnalyst: false,
      reportingManager: false,
    },
  ]),
  clean: jsonInputClean,
});

export const youtubeChannelLinks = input({
  label: "Youtube Channel Links",
  type: "code",
  language: "json",
  comments:
    "Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status active to the list. It will remain in a pending state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list.",
  example: JSON.stringify([
    {
      channelId: "string",
      status: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const googleMyBusinessLink = input({
  label: "Google My Business Link",
  type: "code",
  language: "json",
  comments:
    "The Business Profile which is linked or in the process of being linked with the Merchant Center account.",
  example: JSON.stringify({
    gmbEmail: "string",
    status: "string",
    gmbAccountId: "string",
  }),
  clean: jsonInputClean,
});

export const businessInformation = input({
  label: "Business Information",
  type: "code",
  language: "json",
  comments: "The business information of the account.",
  example: JSON.stringify({
    address: {
      streetAddress: "string",
      locality: "string",
      region: "string",
      postalCode: "string",
      country: "string",
    },
    phoneNumber: "string",
    phoneVerificationStatus: "string",
    customerService: {
      url: "string",
      email: "string",
      phoneNumber: "string",
    },
    koreanBusinessRegistrationNumber: "string",
  }),
  clean: jsonInputClean,
});

export const automaticImprovements = input({
  label: "Automatic Improvements",
  type: "code",
  language: "json",
  comments:
    "The automatic improvements of the account can be used to automatically update items, improve images and shipping. Each section inside AutomaticImprovements is updated separately.",
  example: JSON.stringify({
    itemUpdates: {
      accountItemUpdatesSettings: {
        allowPriceUpdates: false,
        allowAvailabilityUpdates: false,
        allowStrictAvailabilityUpdates: false,
        allowConditionUpdates: false,
      },
      effectiveAllowPriceUpdates: false,
      effectiveAllowAvailabilityUpdates: false,
      effectiveAllowStrictAvailabilityUpdates: false,
      effectiveAllowConditionUpdates: false,
    },
    imageImprovements: {
      accountImageImprovementsSettings: {
        allowAutomaticImageImprovements: false,
      },
      effectiveAllowAutomaticImageImprovements: false,
    },
    shippingImprovements: {
      allowShippingImprovements: false,
    },
  }),
  clean: jsonInputClean,
});

export const adsLinks = input({
  label: "Ads Links",
  type: "code",
  language: "json",
  comments:
    "Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status active to the list. It will remain in a pending state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list.",
  example: JSON.stringify([
    {
      adsId: "string",
      status: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const conversionSettings = input({
  label: "Conversion Settings",
  type: "code",
  language: "json",
  comments: "Settings for conversion tracking.",
  example: JSON.stringify({
    freeListingsAutoTaggingEnabled: false,
  }),
  clean: jsonInputClean,
});

export const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  comments: "The list of line items to return.",
  example: JSON.stringify([
    {
      lineItemId: "string",
      productId: "string",
      quantity: "integer",
    },
  ]),
  clean: jsonInputClean,
});

export const returnItems = input({
  label: "Return Items",
  type: "code",
  language: "json",
  comments: "The list of items to return.",
  example: JSON.stringify([
    {
      returnItemId: "string",
      refund: {
        returnRefundReason: "string",
        fullRefund: false,
        partialRefund: {
          priceAmount: {
            value: "string",
            currency: "string",
          },
          taxAmount: {
            value: "string",
            currency: "string",
          },
        },
        reasonText: "string",
        paymentType: "string",
      },
      reject: {
        reason: "string",
        reasonText: "string",
      },
    },
  ]),
  clean: jsonInputClean,
});

export const refundShippingFee = input({
  label: "Refund Shipping Fee",
  type: "code",
  language: "json",
  comments: "Refunds for original shipping fee.",
  example: JSON.stringify([
    {
      returnRefundReason: "string",
      fullRefund: false,
      partialRefund: {
        priceAmount: {
          value: "string",
          currency: "string",
        },
        taxAmount: {
          value: "string",
          currency: "string",
        },
      },
      reasonText: "string",
      paymentType: "string",
    },
  ]),
  clean: jsonInputClean,
});

export const entriesForBatchProduct = input({
  label: "Entries for Batch Request",
  type: "code",
  language: "json",
  comments:
    "Array of batch entry objects for performing multiple product operations (get, insert, update, delete) in a single API call. Each entry must include batchId, merchantId, method, and relevant product data. See [batch request documentation](https://developers.google.com/shopping-content/reference/rest/v2.1/products/custombatch#productscustombatchrequest) for structure details.",
  example:
    "Custom batch examples: https://developers.google.com/shopping-content/reference/rest/v2.1/products/custombatch#productscustombatchrequest",
  clean: jsonInputClean,
  required: true,
});

export const entriesForBatchLocalInventory = input({
  label: "Entries for Batch Request",
  type: "code",
  language: "json",
  comments:
    "Array of batch entry objects for updating local inventory (in-store product availability and pricing) across multiple stores or products. Each entry must include batchId, merchantId, method, storeCode, and inventory data. See [batch request documentation](https://developers.google.com/shopping-content/reference/rest/v2.1/localinventory/custombatch#localinventorycustombatchrequest) for structure details.",
  example:
    "Custom batch examples: https://developers.google.com/shopping-content/reference/rest/v2.1/localinventory/custombatch#localinventorycustombatchrequest",
  clean: jsonInputClean,
  required: true,
});

export const entriesForBatchRegionalInventory = input({
  label: "Entries for Batch Request",
  type: "code",
  language: "json",
  comments:
    "Array of batch entry objects for updating regional inventory (availability and pricing for specific geographic regions). Each entry must include batchId, merchantId, method, regionId, and inventory data. See [batch request documentation](https://developers.google.com/shopping-content/reference/rest/v2.1/regionalinventory/custombatch#regionalinventorycustombatchrequest) for structure details.",
  example:
    "Custom batch examples: https://developers.google.com/shopping-content/reference/rest/v2.1/regionalinventory/custombatch#regionalinventorycustombatchrequest",
  clean: jsonInputClean,
  required: true,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
