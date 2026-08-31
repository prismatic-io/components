import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanAmountInput,
  cleanIntegerInput,
  cleanKeyValueListInput,
  cleanMetadataInput,
  cleanNumberInput,
  cleanObjectInput,
  cleanStringInput,
} from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Stripe connection to use.",
});
export const timeout = input({
  label: "Timeout",
  type: "string",
  comments:
    "The maximum time a client will await a response (in milliseconds).",
  example: "60000",
  placeholder: "Enter timeout in ms",
  required: false,
  clean: cleanNumberInput,
});
export const startingAfter = input({
  label: "Starting After",
  type: "string",
  comments:
    "A cursor for use in pagination. `starting_after` is an object ID that defines the place in the list. For instance, if a list request returns 100 objects ending with `obj_foo`, the next call can include `starting_after=obj_foo` to fetch the next page of the list.",
  example: "cus_1234567890abcdef",
  placeholder: "Enter object ID",
  required: false,
  clean: cleanStringInput,
});
export const limit = input({
  label: "Limit",
  type: "string",
  comments: "The maximum number of results to return.",
  example: "100",
  placeholder: "Enter maximum results",
  required: false,
  clean: cleanIntegerInput,
});
export const endingBefore = input({
  label: "Ending Before",
  type: "string",
  comments:
    "A cursor for use in pagination. `ending_before` is an object ID that defines the place in the list. For instance, if a list request returns 100 objects starting with `obj_bar`, the next call can include `ending_before=obj_bar` to fetch the previous page of the list.",
  example: "cus_1234567890abcdef",
  placeholder: "Enter object ID",
  required: false,
  clean: cleanStringInput,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments:
    "A cursor for pagination across multiple pages of results. Leave empty on the first call. Use the `next_page` value returned in a previous response to request subsequent results.",
  placeholder: "Enter next_page cursor",
  clean: cleanStringInput,
});
const paginationGroupDisplay = {
  label: "Pagination",
  comments: "Cursor and page-size controls for paging through results.",
};
export const cursorPagination = structuredObjectInput({
  ...paginationGroupDisplay,
  inputs: { limit, startingAfter, endingBefore },
});
export const forwardCursorPagination = structuredObjectInput({
  ...paginationGroupDisplay,
  inputs: { limit, startingAfter },
});
export const searchPagination = structuredObjectInput({
  ...paginationGroupDisplay,
  inputs: { limit, page },
});
export const query = input({
  label: "Query",
  type: "string",
  required: true,
  comments:
    "The search query string used to filter results. Supports Stripe's search query language with field-based filters and operators.",
  example: "email:'jenny@example.com'",
  placeholder: "Enter search query",
  clean: util.types.toString,
});
export const created = input({
  label: "Created",
  type: "code",
  language: "json",
  comments: "A filter on the list based on the object created field.",
  placeholder: "Enter created date filter",
  required: false,
  example: JSON.stringify({ gt: 1620000000 }),
  clean: cleanObjectInput,
});
export const metadata = input({
  label: "Metadata",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "Set of key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them.",
  example: '{"order_id": "6735"}',
  placeholder: "Enter metadata key-value pairs",
  required: false,
  clean: cleanMetadataInput,
});
export const fieldValues = input({
  label: "Values",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "The names of optional fields and their values to use when creating/updating a record. For example, if a custom configured field is not represented as an input, here its key can be specified along with an assigned value.",
  example: '{"footer": "Thank you for your business"}',
  placeholder: "Enter key-value pairs",
  required: false,
  clean: cleanKeyValueListInput,
});
export const description = input({
  label: "Description",
  type: "string",
  comments:
    "An arbitrary description for the object, displayed in the Stripe Dashboard.",
  example: "Monthly subscription invoice",
  placeholder: "Enter description",
  required: false,
  clean: cleanStringInput,
});
export const currency = input({
  label: "Currency",
  type: "string",
  comments:
    "The three-letter ISO currency code in lowercase (e.g., usd, eur, gbp).",
  example: "usd",
  placeholder: "Enter currency code",
  required: false,
  clean: cleanStringInput,
});
export const customerId = input({
  label: "Customer ID",
  type: "string",
  comments: "The unique identifier for the customer.",
  example: "cus_1234567890abcdef",
  placeholder: "Enter Customer ID",
  required: false,
  dataSource: "selectCustomer",
  clean: cleanStringInput,
});
export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  comments: "The unique identifier for the subscription.",
  example: "sub_1234567890abcdef",
  placeholder: "Enter Subscription ID",
  required: false,
  dataSource: "selectSubscription",
  clean: cleanStringInput,
});
export const priceId = input({
  label: "Price ID",
  type: "string",
  comments: "The unique identifier for the price.",
  example: "price_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Price ID",
  required: true,
  dataSource: "selectPrice",
  clean: util.types.toString,
});
export const productId = input({
  label: "Product ID",
  type: "string",
  comments: "The unique identifier for the product.",
  example: "prod_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Product ID",
  required: true,
  dataSource: "selectProduct",
  clean: util.types.toString,
});
export const chargeId = input({
  label: "Charge ID",
  type: "string",
  comments: "The unique identifier for the charge.",
  example: "ch_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Charge ID",
  required: true,
  clean: util.types.toString,
});
export const paymentIntent = input({
  label: "Payment Intent",
  type: "string",
  required: false,
  comments:
    "Filters results to only charges created by the specified Payment Intent. Provide the Payment Intent ID to scope the query.",
  example: "pi_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Payment Intent ID",
  clean: cleanStringInput,
});
export const paymentId = input({
  label: "Payment Method ID",
  type: "string",
  comments: "The unique identifier for the payment method.",
  example: "pm_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Payment Method ID",
  required: false,
  dataSource: "selectCard",
  clean: cleanStringInput,
});
export const receiptEmail = input({
  label: "Receipt Email",
  type: "string",
  comments:
    "The email address that the receipt for the charge will be sent to. Updating this field triggers a new email receipt to the updated address.",
  example: "customer@example.com",
  placeholder: "Enter receipt email",
  required: false,
  clean: cleanStringInput,
});
export const shipping = input({
  label: "Shipping",
  type: "code",
  language: "json",
  placeholder: "Enter shipping information",
  required: false,
  comments:
    "Shipping information for the charge. Helps prevent fraud on charges for physical goods.",
  example: JSON.stringify({
    address: {
      city: "San Francisco",
      country: "US",
      line1: "1234 Main Street",
      line2: "Apt. 123",
      postal_code: "94111",
      state: "CA",
    },
    name: "John Doe",
  }),
  clean: cleanObjectInput,
});
export const transferGroup = input({
  label: "Transfer Group",
  type: "string",
  required: false,
  comments:
    "A string that identifies this transaction as part of a group. Used with Stripe Connect to associate related charges, transfers, and refunds.",
  example: "ORDER_95",
  placeholder: "Enter transfer group",
  clean: cleanStringInput,
});
export const applicationFeeAmount = input({
  label: "Application Fee Amount",
  type: "string",
  comments:
    "The application fee amount, as a whole number in the currency's smallest unit (500 is $5.00 in USD, ¥500 in JPY). Only applicable when collection method is 'Charge Automatically'.",
  example: "500",
  placeholder: "Enter fee amount in a whole number (exclude decimals)",
  required: false,
  clean: cleanAmountInput,
});
