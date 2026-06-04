import { input, util } from "@prismatic-io/spectral";
import { cleanKeyValPairListInput, cleanStringInput } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  comments: "The connection to be used.",
  required: true,
});

export const resultsPerPage = input({
  label: "Results Per Page",
  type: "string",
  comments: "Provide an integer for the amount of items to be returned.",
  required: false,
  placeholder: "Enter a number",
  example: "100",
  clean: cleanStringInput,
});

export const page = input({
  label: "Page Number",
  type: "string",
  comments: "Provide an integer for the page number.",
  required: false,
  placeholder: "Enter a page number",
  example: "1",
  clean: cleanStringInput,
});

export const offset = input({
  label: "Page Offset",
  type: "string",
  comments: "Provide an integer for the page offset since the first page.",
  required: false,
  placeholder: "Enter an offset",
  example: "0",
  clean: cleanStringInput,
});

export const customerId = input({
  label: "Customer",
  type: "string",
  comments:
    "Provide a unique identifier for the desired customer. This value should be an id",
  required: true,
  placeholder: "Enter a customer ID",
  example: "someone@example.com",
  clean: util.types.toString,
  dataSource: "selectCustomer",
});

export const email = input({
  label: "Email Address",
  type: "string",
  comments: "Provide a valid email address.",
  required: true,
  placeholder: "Enter an email address",
  example: "john.doe@example.com",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  comments: "Provide a string value for the first name.",
  required: false,
  placeholder: "Enter a first name",
  example: "John",
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  comments: "Provide a string value for the last name.",
  required: false,
  placeholder: "Enter a last name",
  example: "Doe",
});

export const username = input({
  label: "Username",
  type: "string",
  comments: "Provide a string value for the username.",
  required: false,
  placeholder: "Enter a username",
  example: "john.doe",
});

export const company = input({
  label: "Company",
  type: "string",
  comments: "Provide a string value for the company name.",
  required: false,
  placeholder: "Enter a company name",
  example: "Acme Inc.",
});

export const billingAddress1 = input({
  label: "Billing Address 1",
  type: "string",
  comments: "Provide a string value for the address 1 of the billing address.",
  required: false,
  placeholder: "Enter an address",
  example: "123 Main Street",
});

export const billingAddress2 = input({
  label: "Billing Address 2",
  type: "string",
  comments: "Provide a string value for the address 2 of the billing address.",
  required: false,
  placeholder: "Enter additional address information",
  example: "Suite 100",
});

export const city = input({
  label: "Billing City",
  type: "string",
  comments: "Provide a string value for the city of the billing address.",
  required: false,
  placeholder: "Enter a city",
  example: "San Francisco",
});

export const state = input({
  label: "State",
  type: "string",
  comments: "Provide a string value for the state of the billing address.",
  required: false,
  placeholder: "Enter a state",
  example: "CA",
});

export const postalcode = input({
  label: "Postal Code",
  type: "string",
  comments:
    "Provide a string value for the postal code of the billing address.",
  required: false,
  placeholder: "Enter a postal code",
  example: "94103",
});

export const country = input({
  label: "Country",
  type: "string",
  comments: "Provide a string value for the country of the billing address.",
  required: false,
  placeholder: "Enter a country code",
  example: "US",
});

export const phone = input({
  label: "Phone",
  type: "string",
  comments:
    "Provide a string value for the phone number of the billing address.",
  required: false,
  placeholder: "Enter a phone number",
  example: "+1-555-123-4567",
});

export const shippingAddress1 = input({
  label: "Shipping Address 1",
  type: "string",
  comments: "Provide a string value for the address 1 of the shipping address.",
  required: false,
  placeholder: "Enter an address",
  example: "123 Main Street",
});

export const shippingAddress2 = input({
  label: "Shipping Address 2",
  type: "string",
  comments: "Provide a string value for the address 2 of the shipping address.",
  required: false,
  placeholder: "Enter additional address information",
  example: "Suite 100",
});

export const productId = input({
  label: "Product Id",
  type: "string",
  comments: "Provide a unique identifier of the given product.",
  required: true,
  placeholder: "Enter a product ID",
  example: "100",
  dataSource: "selectProduct",
});

export const productName = input({
  label: "Product Name",
  type: "string",
  comments: "Provide a string value for the name of the product.",
  required: false,
  placeholder: "Enter a product name",
  example: "Software Subscription",
});

export const productType = input({
  label: "Product Type",
  type: "string",
  comments: "Provide a string value for the type of the product.",
  required: false,
  placeholder: "Enter a product type",
  example: "simple",
});

export const price = input({
  label: "Price",
  type: "string",
  comments: "Provide a number for the price of the product.",
  required: false,
  placeholder: "Enter a price",
  example: "19.99",
});

export const description = input({
  label: "Description",
  type: "string",
  comments: "Provide a description for the product.",
  required: false,
  placeholder: "Enter a product description",
  example: "This is a high quality product with excellent features.",
});

export const summary = input({
  label: "Summary",
  type: "string",
  comments: "Provide a short summary for the product details.",
  required: false,
  placeholder: "Enter a product summary",
  example: "High quality product with great value.",
});

export const values = input({
  label: "Optional Values",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "For each item, provide an optional key value pair to be injected into the request body.",
  required: false,
});

export const categories = input({
  label: "Categories",
  type: "code",
  comments:
    "For each item, provide an id of a category that the product belongs to.",
  required: false,
  language: "json",
  placeholder: "Enter category IDs",
  example: `[
  {
    "id": 9
  },
  {
    "id": 14
  }
]`,
});

export const images = input({
  label: "Images",
  type: "code",
  language: "json",
  comments:
    "For each item, provide a link to the image stored in your media library",
  required: false,
  placeholder: "Enter image URLs",
  example: `[
  {
    "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
  },
  {
    "src": "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
  }
]`,
});

export const period = input({
  label: "Period",
  type: "string",
  comments: "Provide a value for the sales period. Default is today's date.",
  required: false,
  model: [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Last Month", value: "last_month" },
    { label: "Year", value: "year" },
  ],
});

export const minDate = input({
  label: "Start Date",
  type: "string",
  comments:
    "Return sales for a specific start date, the date need to be in the YYYY-MM-DD format.",
  required: false,
  placeholder: "Enter a date (YYYY-MM-DD)",
  example: "2024-01-15",
});

export const maxDate = input({
  label: "End Date",
  type: "string",
  comments:
    "Return sales for a specific end date, the date need to be in the YYYY-MM-DD format.",
  required: false,
  placeholder: "Enter a date (YYYY-MM-DD)",
  example: "2024-12-31",
});

export const search = input({
  label: "Search",
  type: "string",
  comments: "Search for a specific string.",
  required: false,
  placeholder: "Enter a search term",
  example: "Product name",
  clean: cleanStringInput,
});

export const before = input({
  label: "Before",
  type: "string",
  comments:
    "Limit response to resources published before a given ISO8601 compliant date.",
  required: false,
  placeholder: "Enter an ISO8601 date",
  example: "2024-01-15T10:30:00Z",
  clean: cleanStringInput,
});

export const after = input({
  label: "After",
  type: "string",
  comments:
    "Limit response to resources published after a given ISO8601 compliant date.",
  required: false,
  placeholder: "Enter an ISO8601 date",
  example: "2024-01-15T10:30:00Z",
  clean: cleanStringInput,
});

export const orderId = input({
  label: "Order Id",
  type: "string",
  comments: "Provide the unique identifier of the order.",
  required: true,
  placeholder: "Enter an order ID",
  example: "100",
  dataSource: "selectOrder",
});

export const paymentMethod = input({
  label: "Payment Method Key",
  type: "string",
  comments: "Provide the unique identifier of the payment method.",
  required: false,
  placeholder: "Enter a payment method key",
  example: "bacs",
});

export const paymentMethodTitle = input({
  label: "Payment Method Title",
  type: "string",
  comments: "Provide the display title of the payment method.",
  required: false,
  placeholder: "Enter a payment method title",
  example: "Direct Bank Transfer",
});

export const isPaid = input({
  label: "Is Paid",
  type: "boolean",
  comments: "Determines if the order has been paid for.",
  required: true,
});

export const lineItems = input({
  label: "Line Items",
  type: "code",
  language: "json",
  comments:
    "Provide a JSON array, with objects each specifying details of the line item.",
  required: false,
  placeholder: "Enter line items",
  example: `[
  {
    "product_id": 93,
    "quantity": 2
  },
  {
    "product_id": 22,
    "variation_id": 23,
    "quantity": 1
  }
]`,
});

export const shippingLines = input({
  label: "Shipping Lines",
  type: "code",
  comments:
    "Provide a JSON array, with objects each specifying shipping details",
  required: false,
  language: "json",
  placeholder: "Enter shipping details",
  example: `[
  {
    "method_id": "flat_rate",
    "method_title": "Flat Rate",
    "total": "10.00"
  }
]`,
});

export const categoryName = input({
  label: "Category Name",
  type: "string",
  comments: "Provide a name for the category.",
  required: true,
  placeholder: "Enter a category name",
  example: "Electronics",
});

export const categoryId = input({
  label: "Category Id",
  type: "string",
  comments: "Provide a unique identifier of an existing category.",
  required: true,
  placeholder: "Enter a category ID",
  example: "100",
  dataSource: "selectProductCategory",
});

export const refundId = input({
  label: "Refund Id",
  type: "string",
  comments: "Provide a unique identifier of an existing refund.",
  required: true,
  placeholder: "Enter a refund ID",
  example: "100",
  dataSource: "selectRefund",
});

export const imageLink = input({
  label: "Image Link",
  type: "string",
  comments: "Provide a link to an image to represent your category.",
  required: false,
  placeholder: "Enter an image URL",
  example:
    "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg",
});

export const refundAmount = input({
  label: "Refund Amount",
  type: "string",
  comments: "Provide a value for the refund amount.",
  required: false,
  placeholder: "Enter a refund amount",
  example: "10.00",
});

export const params = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  comments: "Extra parameters to be passed to the request.",
  required: false,
  clean: cleanKeyValPairListInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "If true, all pages will be fetched.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const resourceType = input({
  label: "Resource Type",
  type: "string",
  comments: "Select the WooCommerce resource type to poll for new records.",
  required: true,
  model: [
    { label: "Orders", value: "orders" },
    { label: "Customers", value: "customers" },
    { label: "Products", value: "products" },
    { label: "Coupons", value: "coupons" },
  ],
});
