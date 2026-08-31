import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanAmountInput,
  cleanObjectInput,
  cleanRequiredAmountInput,
  cleanStringInput,
  cleanStringListInput,
  cleanTriStateBoolInput,
} from "../util";
import {
  applicationFeeAmount,
  connectionInput,
  created,
  currency,
  cursorPagination,
  customerId,
  description,
  metadata,
  paymentIntent,
  query,
  receiptEmail,
  searchPagination,
  shipping,
  timeout,
  transferGroup,
} from "./common";
export const clientSecret = input({
  label: "Client Secret",
  type: "string",
  required: false,
  comments:
    "The client secret of the PaymentIntent. Required if a publishable key is used to retrieve the source.",
  example: "pi_1JaOXaDtJQgcyrdSRnsI9KW5_secret_XXXXXXXXXXXX",
  placeholder: "Enter client secret",
  clean: cleanStringInput,
});
export const amount = input({
  label: "Amount",
  type: "string",
  required: true,
  comments:
    "The amount intended to be collected, as a whole number in the currency's smallest unit (2000 is $20.00 in USD, ¥2000 in JPY).",
  example: "2000",
  placeholder: "Enter amount in whole number (exclude decimals)",
  clean: cleanRequiredAmountInput,
});
export const automaticPaymentMethods = input({
  label: "Automatic Payment Methods",
  type: "code",
  language: "json",
  placeholder: "Enter automatic payment method settings",
  required: false,
  comments:
    "When enabled, the PaymentIntent will accept payment methods enabled in the Stripe Dashboard that are compatible with the PaymentIntent's other parameters.",
  example: JSON.stringify({ enabled: true }),
  clean: cleanObjectInput,
});
export const confirm = input({
  label: "Confirm",
  type: "boolean",
  required: false,
  comments: "When true, attempts to confirm this PaymentIntent immediately.",
  clean: util.types.toBool,
});
export const offSession = input({
  label: "Off Session",
  type: "string",
  comments:
    "Set to true to indicate that the customer is not in the checkout flow during this payment attempt and is therefore unable to authenticate.",
  required: false,
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "",
  clean: cleanTriStateBoolInput,
});
export const paymentMethod = input({
  label: "Payment Method",
  type: "string",
  comments:
    "ID of the payment method (a PaymentMethod, Card, or compatible Source object) to attach to this PaymentIntent.",
  example: "pm_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Payment Method ID",
  required: false,
  clean: cleanStringInput,
});
export const setupFutureUsage = input({
  label: "Setup Future Usage",
  type: "string",
  comments:
    "Indicates the intent to make future payments with this PaymentIntent's payment method. Use `on_session` if the customer is present during the future payment, or `off_session` if not.",
  required: false,
  model: [
    { label: "", value: "" },
    { label: "On Session", value: "on_session" },
    { label: "Off Session", value: "off_session" },
  ],
  default: "",
  clean: cleanStringInput,
});
export const captureMethod = input({
  label: "Capture Method",
  type: "string",
  comments:
    "Controls when the funds will be captured from the customer's account.",
  model: [
    { label: "", value: "" },
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
    { label: "Automatic async", value: "automatic_async" },
  ],
  default: "",
  required: false,
  clean: cleanStringInput,
});
export const confirmationMethod = input({
  label: "Confirmation Method",
  type: "string",
  comments:
    "Controls how the PaymentIntent is confirmed: `automatic` confirms on the server immediately, `manual` requires explicit client-side confirmation.",
  model: [
    { label: "", value: "" },
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
  ],
  default: "",
  required: false,
  clean: cleanStringInput,
});
export const errorOnRequiresAction = input({
  label: "Error On Requires Action",
  type: "string",
  comments:
    "Set to true to fail the payment attempt if the PaymentIntent transitions into requires_action.",
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "",
  required: false,
  clean: cleanTriStateBoolInput,
});
export const mandate = input({
  label: "Mandate",
  type: "string",
  comments: "ID of the mandate to be used for this payment.",
  example: "mandate_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Mandate ID",
  required: false,
  clean: cleanStringInput,
});
export const mandateData = input({
  label: "Mandate Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ customer_acceptance: { type: "online" } }),
  comments: "This hash contains details about the Mandate to create.",
  placeholder: "Enter mandate data",
  required: false,
  clean: cleanObjectInput,
});
export const onBehalfOf = input({
  label: "On Behalf Of",
  type: "string",
  comments: "The Stripe account ID for which these funds are intended.",
  example: "acct_1F5yQhFjP0puYwXh",
  placeholder: "Enter connected account ID",
  required: false,
  clean: cleanStringInput,
});
export const paymentMethodData = input({
  label: "Payment Method Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ type: "card" }),
  comments: "If provided, this hash will be used to create a PaymentMethod.",
  placeholder: "Enter payment method data",
  required: false,
  clean: cleanObjectInput,
});
export const paymentMethodOptions = input({
  label: "Payment Method Options",
  type: "code",
  language: "json",
  example: JSON.stringify({ card: { request_three_d_secure: "any" } }),
  comments: "Payment-method-specific configuration for this PaymentIntent.",
  placeholder: "Enter payment method options",
  required: false,
  clean: cleanObjectInput,
});
export const paymentMethodTypes = input({
  label: "Payment Method Types",
  type: "string",
  collection: "valuelist",
  comments:
    "The list of payment method types that this PaymentIntent is allowed to use.",
  example: "card",
  placeholder: "Enter payment method type",
  required: false,
  clean: cleanStringListInput,
});
export const radarOptions = input({
  label: "Radar Options",
  type: "code",
  language: "json",
  example: JSON.stringify({ session: "123456" }),
  comments: "Options to configure Radar.",
  placeholder: "Enter Radar options",
  required: false,
  clean: cleanObjectInput,
});
export const returnUrl = input({
  label: "Return URL",
  type: "string",
  comments:
    "The URL to redirect the customer back to after authenticating or cancelling payment on the payment method's app or site.",
  example: "https://example.com/return",
  placeholder: "Enter return URL",
  required: false,
  clean: cleanStringInput,
});
export const useStripeSdk = input({
  label: "Use Stripe SDK",
  type: "string",
  comments:
    "Set to true when confirming server-side and using Stripe.js, iOS, or Android client-side SDKs to handle the next actions.",
  required: false,
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "",
  clean: cleanTriStateBoolInput,
});
export const cancellationReason = input({
  label: "Cancellation Reason",
  type: "string",
  comments: "The reason for cancelling the Payment Intent.",
  required: false,
  model: [
    { label: "", value: "" },
    { label: "Abandoned", value: "abandoned" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Fraudulent", value: "fraudulent" },
    { label: "Requested by Customer", value: "requested_by_customer" },
  ],
  default: "",
  clean: cleanStringInput,
});
export const amountToCapture = input({
  label: "Amount to Capture",
  type: "string",
  comments:
    "The amount to capture from the PaymentIntent, which must be less than or equal to the original amount. Enter a whole number in the currency's smallest unit (1000 is $10.00 in USD, ¥1000 in JPY).",
  example: "1000",
  placeholder: "Enter amount in a whole number (exclude decimals)",
  required: false,
  clean: cleanAmountInput,
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
export const statementDescriptor = input({
  label: "Statement Descriptor",
  type: "string",
  comments:
    "For non-card charges, the complete description that appears on customer statements. Must be 5-22 characters and cannot use special characters `<`, `>`, `\\`, `'`, `\"`.",
  example: "ACME ORDER 95",
  placeholder: "Enter statement descriptor",
  required: false,
  clean: cleanStringInput,
});
export const statementDescriptorSuffix = input({
  label: "Statement Descriptor Suffix",
  type: "string",
  comments:
    "Information about a card payment that customers see on their statements, concatenated with the prefix (the account name) to form the full statement descriptor.",
  example: "ORDER 95",
  placeholder: "Enter statement descriptor suffix",
  required: false,
  clean: cleanStringInput,
});
export const transferData = input({
  label: "Transfer Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ destination: "acct_1F5yQhFjP0puYwXh" }),
  comments:
    "The parameters used to automatically create a Transfer when the payment succeeds.",
  placeholder: "Enter transfer data",
  required: false,
  clean: cleanObjectInput,
});
const paymentApplicationFeeAmount = {
  ...applicationFeeAmount,
  comments:
    "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account. Enter a whole number in the currency's smallest unit (500 is $5.00 in USD, ¥500 in JPY).",
};
const paymentTransferGroup = {
  ...transferGroup,
  comments:
    "A string that identifies the resulting payment as part of a group.",
};
const paymentIntentShipping = {
  ...shipping,
  comments: "Shipping information for this PaymentIntent.",
};
export const cancelPaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  paymentIntentId,
  cancellationReason,
};
export const capturePaymentIntentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Application Fee Amount, Statement Descriptor, Statement Descriptor Suffix, and Transfer Data.",
  inputs: {
    applicationFeeAmount: paymentApplicationFeeAmount,
    statementDescriptor,
    statementDescriptorSuffix,
    transferData: {
      ...transferData,
      comments:
        "The parameters used to automatically create a Transfer when the payment is captured.",
      example: JSON.stringify({ amount: 1000 }),
    },
  },
});
export const capturePaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  paymentIntentId,
  amountToCapture,
  metadata,
  additionalFields: capturePaymentIntentAdditionalFields,
};
export const confirmPaymentIntentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Setup Future Usage, Error On Requires Action, Mandate, Mandate Data, Off Session, Payment Method Data, Payment Method Options, Radar Options, Return URL, and Use Stripe SDK.",
  inputs: {
    setupFutureUsage,
    errorOnRequiresAction,
    mandate,
    mandateData,
    offSession,
    paymentMethodData,
    paymentMethodOptions,
    radarOptions,
    returnUrl,
    useStripeSdk,
  },
});
export const confirmPaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  paymentIntentId,
  paymentMethod,
  receiptEmail,
  captureMethod,
  additionalFields: confirmPaymentIntentAdditionalFields,
};
export const createPaymentIntentTransferOptions = structuredObjectInput({
  label: "Transfer Options",
  comments:
    "Application fee, settlement account, transfer data, and transfer group for routing funds to connected accounts.",
  inputs: {
    applicationFeeAmount: paymentApplicationFeeAmount,
    onBehalfOf,
    transferData,
    transferGroup: paymentTransferGroup,
  },
});
export const createPaymentIntentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Setup Future Usage, Shipping, Statement Descriptor, Statement Descriptor Suffix, Capture Method, Confirmation Method, Error On Requires Action, Mandate, Mandate Data, Off Session, Payment Method Data, Payment Method Options, Radar Options, Return URL, and Use Stripe SDK.",
  inputs: {
    setupFutureUsage,
    shipping: paymentIntentShipping,
    statementDescriptor,
    statementDescriptorSuffix,
    captureMethod,
    confirmationMethod,
    errorOnRequiresAction,
    mandate,
    mandateData,
    offSession,
    paymentMethodData,
    paymentMethodOptions,
    radarOptions,
    returnUrl,
    useStripeSdk,
  },
});
export const createPaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  amount,
  currency: {
    ...currency,
    required: true,
    clean: util.types.toString,
  },
  automaticPaymentMethods,
  confirm,
  customerId: {
    ...customerId,
    label: "Customer ID",
    comments:
      "ID of the Customer this PaymentIntent belongs to, if one exists.",
    clean: cleanStringInput,
  },
  description: {
    ...description,
    comments:
      "An arbitrary string attached to the object. Often useful for displaying to users.",
    clean: cleanStringInput,
  },
  metadata,
  paymentMethod,
  receiptEmail: {
    ...receiptEmail,
    comments:
      "Email address that the receipt for the resulting payment will be sent to. ",
  },
  paymentMethodTypes,
  transferOptions: createPaymentIntentTransferOptions,
  additionalFields: createPaymentIntentAdditionalFields,
};
export const getPaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  paymentIntent: {
    ...paymentIntent,
    required: true,
    comments: "The ID of the PaymentIntent to retrieve.",
    label: "Payment Intent ID",
    clean: util.types.toString,
  },
  clientSecret,
};
export const listPaymentIntentsInputs = {
  timeout,
  stripeConnection: connectionInput,
  customerId: {
    ...customerId,
    label: "Customer ID",
    comments:
      "Only return PaymentIntents for the customer specified by this customer ID.",
    clean: cleanStringInput,
  },
  created,
  pagination: cursorPagination,
};
export const searchPaymentIntentInputs = {
  timeout,
  stripeConnection: connectionInput,
  query,
  pagination: searchPagination,
};
export const updatePaymentIntentTransferOptions = structuredObjectInput({
  label: "Transfer Options",
  comments:
    "Application fee, transfer data, and transfer group for routing funds to connected accounts.",
  inputs: {
    applicationFeeAmount: paymentApplicationFeeAmount,
    transferData,
    transferGroup: paymentTransferGroup,
  },
});
export const updatePaymentIntentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  comments:
    "Additional optional fields: includes Setup Future Usage, Shipping, Statement Descriptor, Statement Descriptor Suffix, Capture Method, Payment Method Data, and Payment Method Options.",
  inputs: {
    setupFutureUsage,
    shipping: paymentIntentShipping,
    statementDescriptor,
    statementDescriptorSuffix,
    captureMethod,
    paymentMethodData,
    paymentMethodOptions,
  },
});
export const updatePaymentIntentInputs = {
  paymentIntentId,
  timeout,
  stripeConnection: connectionInput,
  amount,
  currency,
  customerId: {
    ...customerId,
    label: "Customer ID",
    comments:
      "ID of the Customer this PaymentIntent belongs to, if one exists.",
    clean: cleanStringInput,
  },
  description: {
    ...description,
    comments:
      "An arbitrary string attached to the object. Often useful for displaying to users.",
    clean: cleanStringInput,
  },
  metadata,
  paymentMethod,
  receiptEmail: {
    ...receiptEmail,
    comments:
      "Email address that the receipt for the resulting payment will be sent to. ",
  },
  paymentMethodTypes,
  transferOptions: updatePaymentIntentTransferOptions,
  additionalFields: updatePaymentIntentAdditionalFields,
};
