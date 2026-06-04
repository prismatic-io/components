import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanObjectInput, cleanStringInput } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Stripe connection to use.",
});

export const timeout = input({
  label: "Timeout",
  type: "string",
  comments: "The maximum time a client will await a response (in milliseconds).",
  example: "60000",
  placeholder: "Enter timeout in ms",
  required: false,
  clean: util.types.toNumber,
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
  clean: cleanNumberInput,
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
  comments: "When true, automatically fetches all pages of results using pagination.",
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
  required: false,
  example: JSON.stringify({ gt: 1620000000 }),
  clean: util.types.toString,
});

export const overwriteOnUpdate = input({
  label: "Protect Blank Values",
  type: "boolean",
  comments: "When true, blank values will not overwrite existing values in Stripe.",
  required: true,
  clean: util.types.toBool,
});

export const metadata = input({
  label: "Metadata",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "Set of key-value pairs that can be attached to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them.",
  placeholder: "Enter metadata key-value pairs",
  required: false,
});

export const fieldValues = input({
  label: "Values",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "The names of optional fields and their values to use when creating/updating a record. For example, if a custom configured field is not represented as an input, here its key can be specified along with an assigned value.",
  placeholder: "Enter key-value pairs",
  required: false,
});

export const description = input({
  label: "Description",
  type: "string",
  comments: "An arbitrary description for the object, displayed in the Stripe Dashboard.",
  example: "Monthly subscription invoice",
  placeholder: "Enter description",
  required: false,
  clean: cleanStringInput,
});

export const currency = input({
  label: "Currency",
  type: "string",
  comments: "The three-letter ISO currency code in lowercase (e.g., usd, eur, gbp).",
  example: "usd",
  placeholder: "Enter currency code",
  required: false,
  clean: cleanStringInput,
});

export const source = input({
  label: "Source",
  type: "string",
  comments:
    "Filters results to only include transactions originating from the specified Stripe source ID (e.g., a charge or payout ID).",
  placeholder: "Enter source ID",
  required: false,
  clean: util.types.toString,
});

export const bodyParams = input({
  label: "Body Params",
  type: "code",
  language: "json",
  comments: "More parameters to pass to the request.",
  required: false,
  example: JSON.stringify({ customer: "cus_123456" }, null, 2),
  clean: cleanObjectInput,
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

export const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  comments: "The unique identifier for the invoice.",
  example: "in_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Invoice ID",
  required: true,
  dataSource: "selectInvoice",
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

export const paymentIntentId = input({
  label: "Payment Intent ID",
  type: "string",
  comments: "The unique identifier for the Payment Intent.",
  example: "pi_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Payment Intent ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectPaymentIntent",
});

export const disputeId = input({
  label: "Dispute ID",
  type: "string",
  comments: "The unique identifier for the dispute.",
  example: "dp_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Dispute ID",
  required: true,
  clean: util.types.toString,
});

export const balanceTransactionId = input({
  label: "Balance Transaction ID",
  type: "string",
  comments: "The unique identifier for the balance transaction.",
  example: "txn_1Jb9jvDtJQgcyrdS1Z9KW5",
  placeholder: "Enter Balance Transaction ID",
  required: true,
  clean: util.types.toString,
});

export const sessionId = input({
  label: "Session ID",
  type: "string",
  comments: "The unique identifier for the Checkout Session.",
  example: "cs_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  placeholder: "Enter Session ID",
  required: true,
  clean: util.types.toString,
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  comments: "The unique identifier for the webhook.",
  example: "we_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Webhook ID",
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
  clean: util.types.toString,
});

export const paymentId = input({
  label: "Payment Method ID",
  type: "string",
  comments: "The unique identifier for the payment method.",
  example: "pm_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Payment Method ID",
  required: false,
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
  clean: util.types.toString,
});

export const shipping = input({
  label: "Shipping",
  type: "code",
  language: "json",
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
  clean: util.types.toString,
});

export const transferGroup = input({
  label: "Transfer Group",
  type: "string",
  required: false,
  comments:
    "A string that identifies this transaction as part of a group. Used with Stripe Connect to associate related charges, transfers, and refunds.",
  example: "ORDER_95",
  placeholder: "Enter transfer group",
  clean: util.types.toString,
});

export const applicationFeeAmount = input({
  label: "Application Fee Amount",
  type: "string",
  comments:
    "The application fee amount in cents. Only applicable when collection method is 'Charge Automatically'.",
  example: "500",
  placeholder: "Enter fee amount in cents",
  required: false,
  clean: cleanNumberInput,
});

export const statementDescriptor = input({
  label: "Statement Descriptor",
  type: "string",
  comments:
    "For non-card charges, the complete description that appears on customer statements. Must be 5-22 characters and cannot use special characters `<`, `>`, `\\`, `'`, `\"`.",
  example: "ACME ORDER 95",
  placeholder: "Enter statement descriptor",
  required: false,
  clean: util.types.toString,
});

export const statementDescriptorSuffix = input({
  label: "Statement Descriptor Suffix",
  type: "string",
  comments:
    "Information about a card payment that customers see on their statements, concatenated with the prefix (the account name) to form the full statement descriptor.",
  example: "ORDER 95",
  placeholder: "Enter statement descriptor suffix",
  required: false,
  clean: util.types.toString,
});

export const transferData = input({
  label: "Transfer Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ destination: "acct_1F5yQhFjP0puYwXh" }),
  comments: "The parameters used to automatically create a Transfer when the payment succeeds.",
  required: false,
  clean: util.types.toString,
});
