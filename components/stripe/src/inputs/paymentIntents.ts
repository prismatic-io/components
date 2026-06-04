import { input, util } from "@prismatic-io/spectral";

export const clientSecret = input({
  label: "Client Secret",
  type: "string",
  required: false,
  comments:
    "The client secret of the PaymentIntent. Required if a publishable key is used to retrieve the source.",
  clean: util.types.toString,
});

export const amount = input({
  label: "Amount",
  type: "string",
  required: true,
  comments: "Amount intended to be collected in cents (e.g., 2000 = $20.00).",
  example: "2000",
  placeholder: "Enter amount in cents",
  clean: util.types.toString,
});

export const automaticPaymentMethods = input({
  label: "Automatic Payment Methods",
  type: "code",
  language: "json",
  required: false,
  comments:
    "When enabled, the PaymentIntent will accept payment methods enabled in the Stripe Dashboard that are compatible with the PaymentIntent's other parameters.",
  example: JSON.stringify({ enabled: true }),
  clean: util.types.toString,
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
  clean: util.types.toString,
});

export const paymentMethod = input({
  label: "Payment Method",
  type: "string",
  comments:
    "ID of the payment method (a PaymentMethod, Card, or compatible Source object) to attach to this PaymentIntent.",
  required: false,
  clean: util.types.toString,
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
  clean: util.types.toString,
});

export const captureMethod = input({
  label: "Capture Method",
  type: "string",
  comments: "Controls when the funds will be captured from the customer's account.",
  model: [
    { label: "", value: "" },
    { label: "Automatic", value: "automatic" },
    { label: "Manual", value: "manual" },
    { label: "Automatic async", value: "automatic_async" },
  ],
  default: "",
  required: false,
  clean: util.types.toString,
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
  clean: util.types.toString,
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
  clean: util.types.toString,
});

export const mandate = input({
  label: "Mandate",
  type: "string",
  comments: "ID of the mandate to be used for this payment.",
  required: false,
  clean: util.types.toString,
});

export const mandateData = input({
  label: "Mandate Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ customer_acceptance: { type: "online" } }),
  comments: "This hash contains details about the Mandate to create.",
  required: false,
  clean: util.types.toString,
});

export const onBehalfOf = input({
  label: "On Behalf Of",
  type: "string",
  comments: "The Stripe account ID for which these funds are intended.",
  required: false,
  clean: util.types.toString,
});

export const paymentMethodData = input({
  label: "Payment Method Data",
  type: "code",
  language: "json",
  example: JSON.stringify({ type: "card" }),
  comments: "If provided, this hash will be used to create a PaymentMethod.",
  required: false,
  clean: util.types.toString,
});

export const paymentMethodOptions = input({
  label: "Payment Method Options",
  type: "code",
  language: "json",
  example: JSON.stringify({ card: { request_three_d_secure: "any" } }),
  comments: "Payment-method-specific configuration for this PaymentIntent.",
  required: false,
  clean: util.types.toString,
});

export const paymentMethodTypes = input({
  label: "Payment Method Types",
  type: "string",
  collection: "valuelist",
  comments: "The list of payment method types that this PaymentIntent is allowed to use.",
  required: false,
  clean: (stringArray: unknown) =>
    (stringArray as []).map((string: string) => util.types.toString(string)),
});

export const radarOptions = input({
  label: "Radar Options",
  type: "code",
  language: "json",
  example: JSON.stringify({ session: "123456" }),
  comments: "Options to configure Radar.",
  required: false,
  clean: util.types.toString,
});

export const returnUrl = input({
  label: "Return URL",
  type: "string",
  comments:
    "The URL to redirect the customer back to after authenticating or cancelling payment on the payment method's app or site.",
  example: "https://example.com/return",
  placeholder: "Enter return URL",
  required: false,
  clean: util.types.toString,
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
  clean: util.types.toString,
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
  clean: util.types.toString,
});

export const amountToCapture = input({
  label: "Amount to Capture",
  type: "string",
  comments:
    "The amount to capture from the PaymentIntent, which must be less than or equal to the original amount.",
  required: false,
  clean: util.types.toString,
});
