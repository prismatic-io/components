import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  jsonInputClean,
  toOptionalNumber,
  toOptionalString,
  valueListInputClean,
} from "../../util";
import { productHighlights } from "./accounts";
import {
  connectionInput,
  fetchAll,
  kind,
  merchantId,
  pagination,
  pickupMethod,
  pickupSla,
  updateMask,
} from "./common";
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
const feedId = input({
  label: "Feed ID",
  type: "string",
  clean: toOptionalString,
  comments:
    "The Content API Supplemental Feed ID. If present then product deletion applies to the data in a supplemental feed. If absent, entire product will be deleted.",
  example: "987654321",
  placeholder: "Enter Feed ID",
  required: false,
});
const offerId = input({
  label: "Offer ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted.",
  example: "SKU-12345",
  placeholder: "Enter Offer ID",
  required: true,
});
const title = input({
  label: "Title",
  type: "string",
  clean: toOptionalString,
  comments:
    "Title of the product. Should be descriptive and include key attributes like brand, product type, and distinguishing features. Maximum 150 characters recommended for optimal display in search results.",
  example: "Men's Organic Cotton T-Shirt - Blue",
  placeholder: "Enter Product Title",
  required: false,
});
const description = input({
  label: "Description",
  type: "string",
  clean: toOptionalString,
  comments:
    "Detailed description of the product including materials, features, care instructions, and benefits. Should provide comprehensive information to help customers make purchasing decisions. Maximum 5,000 characters.",
  example:
    "100% organic cotton t-shirt with crew neck and short sleeves. Machine washable.",
  placeholder: "Enter Product Description",
  required: false,
});
const link = input({
  label: "Link",
  type: "string",
  clean: toOptionalString,
  comments: "URL directly linking to the item's page on the merchant website.",
  example: "https://www.example.com/products/organic-cotton-tshirt-blue",
  placeholder: "Enter Product URL",
  required: false,
});
const imageLink = input({
  label: "Image Link",
  type: "string",
  clean: toOptionalString,
  comments: "URL of an image of the item.",
  example: "https://www.example.com/images/products/tshirt-blue-main.jpg",
  placeholder: "Enter Image URL",
  required: false,
});
const contentLanguage = input({
  label: "Content Language",
  type: "string",
  clean: util.types.toString,
  comments: "The two-letter ISO 639-1 language code for the item.",
  example: "en",
  placeholder: "Enter Language Code",
  required: true,
});
const targetCountry = input({
  label: "Target Country",
  type: "string",
  clean: util.types.toString,
  comments: "The CLDR territory code for the item's country of sale.",
  example: "US",
  placeholder: "Enter Country Code",
  required: true,
});
const feedLabel = input({
  label: "Feed Label",
  type: "string",
  clean: toOptionalString,
  comments:
    "Feed label for the item. Either targetCountry or feedLabel is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
  example: "US-FEED-001",
  placeholder: "Enter Feed Label",
  required: false,
});
const expirationDate = input({
  label: "Expiration Date",
  type: "string",
  clean: toOptionalString,
  comments:
    "Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in productstatuses as googleExpirationDate and might be earlier if expirationDate is too far in the future.",
  example: "2024-12-31",
  placeholder: "Enter Expiration Date (YYYY-MM-DD)",
  required: false,
});
const adult = input({
  label: "Adult",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, indicates the item is targeted towards adults.",
  required: false,
});
const brand = input({
  label: "Brand",
  type: "string",
  clean: toOptionalString,
  comments:
    "Brand name of the product manufacturer or designer. Required for products with GTIN unless the product is custom-made or a media item (books, movies, music). Maximum 70 characters.",
  example: "ExampleBrand",
  placeholder: "Enter Brand Name",
  required: false,
});
const color = input({
  label: "Color",
  type: "string",
  clean: toOptionalString,
  comments:
    "Primary color of the product. Use standardized color names (e.g., 'Blue', 'Navy Blue', 'Red') for consistency. For variants with multiple colors, create separate products with the same itemGroupId. Maximum 100 characters.",
  example: "Blue",
  placeholder: "Enter Color",
  required: false,
});
const googleProductCategory = input({
  label: "Google Product Category",
  type: "string",
  clean: toOptionalString,
  comments:
    "Google's category of the item (see Google product taxonomy). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API.",
  example: "Apparel & Accessories > Clothing > Shirts",
  placeholder: "Enter Google Product Category",
  required: false,
});
const gtin = input({
  label: "GTIN",
  type: "string",
  clean: toOptionalString,
  comments: "Global Trade Item Number (GTIN) of the item.",
  example: "00012345678905",
  placeholder: "Enter GTIN",
  required: false,
});
const itemGroupId = input({
  label: "Item Group ID",
  type: "string",
  clean: toOptionalString,
  comments: "Shared identifier for all variants of the same product.",
  example: "TSHIRT-GROUP-001",
  placeholder: "Enter Item Group ID",
  required: false,
});
const material = input({
  label: "Material",
  type: "string",
  clean: toOptionalString,
  comments:
    "Primary material composition of the product (e.g., Cotton, Polyester, Leather, Wood). Particularly important for apparel, home goods, and furniture. Can include multiple materials separated by slashes (e.g., 'Cotton/Polyester'). Maximum 200 characters.",
  example: "Cotton",
  placeholder: "Enter Material",
  required: false,
});
const mpn = input({
  label: "MPN",
  type: "string",
  clean: toOptionalString,
  comments: "Manufacturer Part Number (MPN) of the item.",
  example: "MPN-12345-A",
  placeholder: "Enter MPN",
  required: false,
});
const pattern = input({
  label: "Pattern",
  type: "string",
  clean: toOptionalString,
  comments:
    "Visual pattern or print design on the product (e.g., Solid, Striped, Polka Dots, Plaid, Floral). Most relevant for apparel, home textiles, and decorative items. Maximum 100 characters.",
  example: "Solid",
  placeholder: "Enter Pattern",
  required: false,
});
const identifierExists = input({
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
  clean: toOptionalString,
  comments: "Date range during which the item is on sale",
  example: "2024-11-01T00:00:00Z/2024-11-30T23:59:59Z",
  placeholder: "Enter Date Range (ISO 8601 Format)",
  required: false,
});
const multipack = input({
  label: "Multipack",
  type: "string",
  clean: toOptionalString,
  comments: "The number of identical products in a merchant-defined multipack.",
  example: "6",
  placeholder: "Enter Multipack Quantity",
  required: false,
});
const customLabel0 = input({
  label: "Custom Label 0",
  type: "string",
  clean: toOptionalString,
  comments:
    "Custom Label 0 for custom grouping of items in a Shopping campaign.",
  example: "Summer Collection",
  placeholder: "Enter Custom Label 0",
  required: false,
});
const customLabel1 = input({
  label: "Custom Label 1",
  type: "string",
  clean: toOptionalString,
  comments:
    "Custom Label 1 for custom grouping of items in a Shopping campaign.",
  example: "Bestseller",
  placeholder: "Enter Custom Label 1",
  required: false,
});
const customLabel2 = input({
  label: "Custom Label 2",
  type: "string",
  clean: toOptionalString,
  comments:
    "Custom Label 2 for custom grouping of items in a Shopping campaign.",
  example: "Clearance",
  placeholder: "Enter Custom Label 2",
  required: false,
});
const customLabel3 = input({
  label: "Custom Label 3",
  type: "string",
  clean: toOptionalString,
  comments:
    "Custom Label 3 for custom grouping of items in a Shopping campaign.",
  example: "Premium",
  placeholder: "Enter Custom Label 3",
  required: false,
});
const customLabel4 = input({
  label: "Custom Label 4",
  type: "string",
  clean: toOptionalString,
  comments:
    "Custom Label 4 for custom grouping of items in a Shopping campaign.",
  example: "Limited Edition",
  placeholder: "Enter Custom Label 4",
  required: false,
});
const isBundle = input({
  label: "Is Bundle",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, indicates the item is a merchant-defined bundle (a custom grouping of different products sold for a single price).",
  required: false,
});
const mobileLink = input({
  label: "Mobile Link",
  type: "string",
  clean: toOptionalString,
  comments: "URL for the mobile-optimized version of the item's landing page.",
  example: "https://m.example.com/products/organic-cotton-tshirt-blue",
  placeholder: "Enter Mobile URL",
  required: false,
});
const availabilityDate = input({
  label: "Availability Date",
  type: "string",
  clean: toOptionalString,
  comments:
    "The day a pre-ordered product becomes available for delivery, in ISO 8601 format.",
  example: "2024-07-01",
  placeholder: "Enter Availability Date (YYYY-MM-DD)",
  required: false,
});
const shippingLabel = input({
  label: "Shipping Label",
  type: "string",
  clean: toOptionalString,
  comments:
    "The shipping label of the product, used to group product in account-level shipping rules.",
  example: "STANDARD-SHIPPING",
  placeholder: "Enter Shipping Label",
  required: false,
});
const displayAdsId = input({
  label: "Display Ads ID",
  type: "string",
  clean: toOptionalString,
  comments: "An identifier for an item for dynamic remarketing campaigns.",
  example: "RMK-12345",
  placeholder: "Enter Display Ads ID",
  required: false,
});
const displayAdsTitle = input({
  label: "Display Ads Title",
  type: "string",
  clean: toOptionalString,
  comments: "Title of an item for dynamic remarketing campaigns.",
  example: "Men's Blue T-Shirt",
  placeholder: "Enter Display Ads Title",
  required: false,
});
const displayAdsLink = input({
  label: "Display Ads Link",
  type: "string",
  clean: toOptionalString,
  comments:
    "URL directly to the item's landing page for dynamic remarketing campaigns.",
  example: "https://www.example.com/products/tshirt-blue",
  placeholder: "Enter Display Ads URL",
  required: false,
});
const displayAdsValue = input({
  label: "Display Ads Value",
  type: "string",
  clean: toOptionalNumber,
  comments: "Offer margin for dynamic remarketing campaigns.",
  example: "10",
  placeholder: "Enter Display Ads Value",
  required: false,
});
const sellOnGoogleQuantity = input({
  label: "Sell On Google Quantity",
  type: "string",
  clean: toOptionalString,
  comments:
    "The quantity of the product that is available for selling on Google. Supported only for online products.",
  example: "100",
  placeholder: "Enter Quantity Available for Google",
  required: false,
});
export const quantity = input({
  label: "Quantity",
  type: "string",
  clean: toOptionalNumber,
  comments: "Quantity of the product. Must be nonnegative.",
  example: "50",
  placeholder: "Enter Quantity",
  required: false,
});
const maxHandlingTime = input({
  label: "Max Handling Time",
  type: "string",
  clean: toOptionalString,
  comments: "Maximal product handling time (in business days).",
  example: "3",
  placeholder: "Enter Maximum Handling Time",
  required: false,
});
const minHandlingTime = input({
  label: "Min Handling Time",
  type: "string",
  clean: toOptionalString,
  comments: "Minimal product handling time (in business days).",
  example: "1",
  placeholder: "Enter Minimum Handling Time",
  required: false,
});
const adsGrouping = input({
  label: "Ads Grouping",
  type: "string",
  clean: toOptionalString,
  comments:
    "Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise.",
  example: "GROUP-A",
  placeholder: "Enter Ads Grouping",
  required: false,
});
const adsRedirect = input({
  label: "Ads Redirect",
  type: "string",
  clean: toOptionalString,
  comments:
    "Allows advertisers to override the item URL when the product is shown within the context of Product Ads.",
  example: "https://www.example.com/ads/tshirt-blue",
  placeholder: "Enter Ads Redirect URL",
  required: false,
});
const ageGroup = input({
  label: "Age Group",
  type: "string",
  clean: toOptionalString,
  comments: "Target age group of the item.",
  example: "adult",
  placeholder: "Enter Age Group",
  required: false,
});
export const availability = input({
  label: "Availability",
  type: "string",
  clean: toOptionalString,
  comments:
    "Current availability status of the product. Valid values: 'in stock' (available for immediate purchase), 'out of stock' (temporarily unavailable), 'preorder' (available for advance orders), 'backorder' (can be ordered but delayed delivery).",
  example: "in stock",
  placeholder: "Enter Availability Status",
  required: false,
});
const condition = input({
  label: "Condition",
  type: "string",
  clean: toOptionalString,
  comments:
    "Physical condition of the product. Valid values: 'new' (brand new, unopened), 'refurbished' (professionally restored to working condition), 'used' (previously owned or opened). Required for all products.",
  example: "new",
  placeholder: "Enter Condition",
  required: false,
});
const gender = input({
  label: "Gender",
  type: "string",
  clean: toOptionalString,
  comments: "Target gender of the item.",
  example: "unisex",
  placeholder: "Enter Gender",
  required: false,
});
const sizeSystem = input({
  label: "Size System",
  type: "string",
  clean: toOptionalString,
  comments:
    "System in which the size is specified. Recommended for apparel items.",
  example: "US",
  placeholder: "Enter Size System",
  required: false,
});
const sizeType = input({
  label: "Size Type",
  type: "string",
  clean: toOptionalString,
  comments: "The cut of the item. Recommended for apparel items.",
  example: "regular",
  placeholder: "Enter Size Type",
  required: false,
});
const additionalSizeType = input({
  label: "Additional Size Type",
  type: "string",
  clean: toOptionalString,
  comments:
    "Additional cut of the item. Used together with sizeType to represent combined size types for apparel items.",
  example: "tall",
  placeholder: "Enter Additional Size Type",
  required: false,
});
const energyEfficiencyClass = input({
  label: "Energy Efficiency Class",
  type: "string",
  clean: toOptionalString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A++",
  placeholder: "Enter Energy Efficiency Class",
  required: false,
});
const minEnergyEfficiencyClass = input({
  label: "Min Energy Efficiency Class",
  type: "string",
  clean: toOptionalString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A+",
  placeholder: "Enter Minimum Energy Efficiency Class",
  required: false,
});
const maxEnergyEfficiencyClass = input({
  label: "Max Energy Efficiency Class",
  type: "string",
  clean: toOptionalString,
  comments:
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  example: "A+++",
  placeholder: "Enter Maximum Energy Efficiency Class",
  required: false,
});
const taxCategory = input({
  label: "Tax Category",
  type: "string",
  clean: toOptionalString,
  comments: "The tax category of the product.",
  example: "apparel",
  placeholder: "Enter Tax Category",
  required: false,
});
const transitTimeLabel = input({
  label: "Transit Time Label",
  type: "string",
  clean: toOptionalString,
  comments:
    "The transit time label of the product, used to group product in account-level transit time tables.",
  example: "STANDARD",
  placeholder: "Enter Transit Time Label",
  required: false,
});
const linkTemplate = input({
  label: "Link Template",
  type: "string",
  clean: toOptionalString,
  comments: "URL template for merchant hosted local storefront.",
  example: "https://www.example.com/store/{store_code}/product/{product_id}",
  placeholder: "Enter Link Template",
  required: false,
});
const mobileLinkTemplate = input({
  label: "Mobile Link Template",
  type: "string",
  clean: toOptionalString,
  comments:
    "URL template for merchant hosted local storefront optimized for mobile devices.",
  example: "https://m.example.com/store/{store_code}/product/{product_id}",
  placeholder: "Enter Mobile Link Template",
  required: false,
});
const canonicalLink = input({
  label: "Canonical Link",
  type: "string",
  clean: toOptionalString,
  comments: "URL for the canonical version of the item's landing page.",
  example: "https://www.example.com/products/tshirt-blue",
  placeholder: "Enter Canonical URL",
  required: false,
});
const externalSellerId = input({
  label: "External Seller ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Required for multi-seller accounts. Use this attribute for a marketplace uploading products for various sellers to a multi-seller account.",
  example: "EXTERNAL-SELLER-789",
  placeholder: "Enter External Seller ID",
  required: true,
});
const pause = input({
  label: "Pause",
  type: "string",
  clean: toOptionalString,
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
const source = input({
  label: "Source",
  type: "string",
  clean: toOptionalString,
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
const productHeight = input({
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
const productLength = input({
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
const productWidth = input({
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
const productWeight = input({
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
const installment = input({
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
const shipping = input({
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
const unitPricingMeasure = input({
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
const unitPricingBaseMeasure = input({
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
const shippingLength = input({
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
const shippingWidth = input({
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
const shippingHeight = input({
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
const displayAdsSimilarIds = input({
  label: "Display Ads Similar IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Advertiser-specified recommendations.",
  example: "SKU-67890",
  placeholder: "Enter Similar Product IDs",
  clean: valueListInputClean,
});
const promotionIds = input({
  label: "Promotion IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The unique ID of a promotion.",
  example: "SUMMER2024",
  placeholder: "Enter Promotion IDs",
  clean: valueListInputClean,
});
const includedDestinations = input({
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
const excludedDestinations = input({
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
const adsLabels = input({
  label: "Ads Labels",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Similar to adsGrouping, but only works on CPC.",
  example: "LABEL-A",
  placeholder: "Enter Ads Labels",
  clean: valueListInputClean,
});
const productTypes = input({
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
const sizes = input({
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
const shoppingAdsExcludedCountries = input({
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
const taxes = input({
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
const shippingWeight = input({
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
const dimensions = structuredObjectInput({
  label: "Dimensions",
  required: false,
  comments:
    "Physical dimensions of the product: length, width, height, and weight.",
  inputs: { productLength, productWidth, productHeight, productWeight },
});
const shippingDimensions = structuredObjectInput({
  label: "Shipping Dimensions",
  required: false,
  comments:
    "Physical dimensions of the item for shipping: length, width, height, and weight.",
  inputs: { shippingLength, shippingWidth, shippingHeight, shippingWeight },
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
const channel = input({
  label: "Channel",
  type: "string",
  clean: util.types.toString,
  comments:
    "The sales channel for this product. 'online' for products sold through the merchant website with shipping, 'local' for products available at physical store locations for local pickup or in-store purchase. Part of the product ID format.",
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
const additionalImageLinks = input({
  label: "Additional Image Links",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Additional URLs of images of the item.",
  example: "https://www.example.com/images/products/tshirt-blue-side.jpg",
  placeholder: "Enter Image URLs",
  clean: valueListInputClean,
});
const lifestyleImageLinks = input({
  label: "Lifestyle Image Links",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase the item in a real-world context.",
  example: "https://www.example.com/images/lifestyle/tshirt-lifestyle-1.jpg",
  placeholder: "Enter Lifestyle Image URLs",
  clean: valueListInputClean,
});
const costOfGoodsSold = input({
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
const productDetails = input({
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
const subscriptionCost = input({
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
const entriesForBatchProduct = input({
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
export const batchProductInputs = {
  connectionInput,
  entries: entriesForBatchProduct,
};
export const createProductInputs = {
  connectionInput,
  merchantId,
  feedId,
  offerId,
  contentLanguage,
  targetCountry,
  externalSellerId,
  channel,
  feedLabel,
  title,
  description,
  link,
  imageLink,
  additionalImageLinks,
  lifestyleImageLinks,
  expirationDate,
  adult,
  kind: { ...kind, required: false },
  brand,
  color,
  googleProductCategory,
  gtin,
  itemGroupId,
  material,
  mpn,
  pattern,
  price,
  salePrice,
  salePriceEffectiveDate,
  dimensions,
  shipping,
  sizes,
  taxes,
  customAttributes,
  identifierExists,
  installment,
  multipack,
  customLabel0,
  customLabel1,
  customLabel2,
  customLabel3,
  customLabel4,
  isBundle,
  mobileLink,
  availabilityDate,
  shippingLabel,
  unitPricingMeasure,
  unitPricingBaseMeasure,
  shippingDimensions,
  displayAdsId,
  displayAdsSimilarIds,
  displayAdsTitle,
  displayAdsLink,
  displayAdsValue,
  sellOnGoogleQuantity,
  promotionIds,
  maxHandlingTime,
  minHandlingTime,
  costOfGoodsSold,
  source,
  includedDestinations,
  excludedDestinations,
  adsGrouping,
  adsLabels,
  adsRedirect,
  productTypes,
  ageGroup,
  availability,
  condition,
  gender,
  sizeSystem,
  sizeType,
  additionalSizeType,
  energyEfficiencyClass,
  minEnergyEfficiencyClass,
  maxEnergyEfficiencyClass,
  taxCategory,
  transitTimeLabel,
  shoppingAdsExcludedCountries,
  pickupMethod,
  pickupSla,
  linkTemplate,
  mobileLinkTemplate,
  productDetails,
  productHighlights,
  subscriptionCost,
  canonicalLink,
  pause,
};
export const deleteProductInputs = {
  connectionInput,
  merchantId,
  productId,
  feedId,
};
export const getProductInputs = {
  connectionInput,
  merchantId,
  productId,
};
export const listProductsInputs = {
  connectionInput,
  merchantId,
  fetchAll,
  pagination,
};
export const updateProductInputs = {
  connectionInput,
  merchantId,
  productId,
  offerId: { ...offerId, required: false, clean: toOptionalString },
  contentLanguage: {
    ...contentLanguage,
    required: false,
    clean: toOptionalString,
  },
  targetCountry: { ...targetCountry, required: false, clean: toOptionalString },
  externalSellerId: {
    ...externalSellerId,
    required: false,
    clean: toOptionalString,
  },
  channel: { ...channel, required: false, clean: toOptionalString },
  feedLabel,
  title,
  description,
  link,
  imageLink,
  additionalImageLinks,
  lifestyleImageLinks,
  expirationDate,
  adult,
  kind: { ...kind, required: false },
  brand,
  color,
  googleProductCategory,
  gtin,
  itemGroupId,
  material,
  mpn,
  pattern,
  price,
  salePrice,
  salePriceEffectiveDate,
  dimensions,
  shipping,
  sizes,
  taxes,
  customAttributes,
  identifierExists,
  installment,
  multipack,
  customLabel0,
  customLabel1,
  customLabel2,
  customLabel3,
  customLabel4,
  isBundle,
  mobileLink,
  availabilityDate,
  shippingLabel,
  unitPricingMeasure,
  unitPricingBaseMeasure,
  shippingDimensions,
  displayAdsId,
  displayAdsSimilarIds,
  displayAdsTitle,
  displayAdsLink,
  displayAdsValue,
  sellOnGoogleQuantity,
  promotionIds,
  maxHandlingTime,
  minHandlingTime,
  costOfGoodsSold,
  source,
  includedDestinations,
  excludedDestinations,
  adsGrouping,
  adsLabels,
  adsRedirect,
  productTypes,
  ageGroup,
  availability,
  condition,
  gender,
  sizeSystem,
  sizeType,
  additionalSizeType,
  energyEfficiencyClass,
  minEnergyEfficiencyClass,
  maxEnergyEfficiencyClass,
  taxCategory,
  transitTimeLabel,
  shoppingAdsExcludedCountries,
  pickupMethod,
  pickupSla,
  linkTemplate,
  mobileLinkTemplate,
  productDetails,
  productHighlights,
  subscriptionCost,
  canonicalLink,
  pause,
  updateMask,
};
export const selectProductInputs = {
  connection: connectionInput,
  merchantId: {
    ...merchantId,
    comments:
      "The ID of the managing account. Used to list products under this merchant.",
  },
};
