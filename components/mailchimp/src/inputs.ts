import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "./utils/clean";
import { toWebhookEvents, toWebhookSources } from "./utils/webhooks";
import { WEBHOOK_EVENTS_MODEL, WEBHOOK_SOURCES_MODEL } from "./constants";

export const listId = input({
  label: "List Id",
  type: "string",
  required: true,
  placeholder: "Enter list ID",
  example: "57afe96172",
  comments:
    "The unique identifier for the audience list. Find this in your Mailchimp account under Audience > Settings > Audience name and defaults.",
  dataSource: "selectList",
  clean: util.types.toString,
});

export const storeId = input({
  label: "Store Id",
  type: "string",
  required: false,
  placeholder: "Enter store ID",
  example: "my_store_01",
  comments: "The unique identifier for the e-commerce store.",
  dataSource: "selectStore",
  clean: util.types.toString,
});

export const cartId = input({
  label: "Cart Id",
  type: "string",
  required: true,
  placeholder: "Enter cart ID",
  example: "cart_abc123xyz",
  comments: "The unique identifier for the cart.",
  dataSource: "selectCart",
});

export const lineId = input({
  label: "Line Id",
  type: "string",
  required: true,
  placeholder: "Enter line ID",
  example: "line_abc123",
  comments: "The unique identifier for the cart line item.",
  dataSource: "selectOrderLineItem",
});

export const lineItemId = input({
  label: "Line Item Id",
  type: "string",
  required: true,
  placeholder: "Enter line item ID",
  example: "item_xyz789",
  comments: "The unique identifier for the order line item.",
});

export const company = input({
  label: "Company",
  type: "string",
  required: false,
  placeholder: "Enter company name",
  example: "Acme Corporation",
  comments: "The company name.",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  placeholder: "Enter first name",
  example: "John",
  comments: "The first name of the contact.",
  clean: util.types.toString,
});

export const productId = input({
  label: "Product Id",
  type: "string",
  required: true,
  placeholder: "Enter product ID",
  example: "prod_abc123",
  comments: "The unique identifier for the product.",
  dataSource: "selectProduct",
  clean: util.types.toString,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The last name of the contact.",
  clean: util.types.toString,
});

export const productVariantId = input({
  label: "Product Variant Id",
  type: "string",
  required: true,
  placeholder: "Enter product variant ID",
  example: "variant_abc123",
  comments:
    "The unique identifier for the product variant. This can be the same as the product ID if no variants exist.",
});

export const quantity = input({
  label: "Quantity",
  type: "string",
  required: true,
  placeholder: "Enter quantity",
  example: "10",
  comments: "The quantity of items.",
});

export const price = input({
  label: "Price",
  type: "string",
  required: true,
  placeholder: "Enter price",
  example: "99.99",
  comments: "The price amount in decimal format.",
});

export const campaignId = input({
  label: "Campaign Id",
  type: "string",
  required: false,
  placeholder: "Enter campaign ID",
  example: "cb398d21d2",
  comments:
    "The unique identifier for the campaign (10-character alphanumeric string).",
  dataSource: "selectCampaign",
  clean: toOptionalString,
});

export const checkoutUrl = input({
  label: "Checkout URL",
  type: "string",
  required: false,
  placeholder: "Enter checkout URL",
  example: "https://www.example.com/checkout/cart123",
  comments:
    "The URL for the cart checkout page. This parameter is required for Abandoned Cart automations.",
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  required: false,
  placeholder: "Enter currency code",
  example: "USD",
  comments: "The three-letter ISO 4217 currency code (e.g., USD, EUR, GBP).",
});

export const orderTotal = input({
  label: "Order Total",
  type: "string",
  required: false,
  placeholder: "Enter order total",
  example: "149.99",
  comments: "The total amount for the order in decimal format.",
});

export const taxTotal = input({
  label: "Tax Total",
  type: "string",
  required: false,
  placeholder: "Enter tax total",
  example: "12.50",
  comments: "The total tax amount in decimal format.",
});

export const customerId = input({
  label: "Customer Id",
  type: "string",
  required: false,
  placeholder: "Enter customer ID",
  example: "cust_abc123xyz",
  comments: "The unique identifier for the customer.",
  dataSource: "selectCustomer",
  clean: toOptionalString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  comments: "The email address of the subscriber.",
  clean: util.types.toString,
});

export const optInStatus = input({
  label: "Opt In Status",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, the customer is opted-in to receive marketing communications. This value will not overwrite the opt-in status of pre-existing list members but will apply to new members added through the e-commerce API. Customers who don't opt in will be added as Transactional members.",
  clean: util.types.toBool,
});

export const address1 = input({
  label: "Address 1",
  type: "string",
  required: false,
  placeholder: "Enter address line 1",
  example: "123 Main Street",
  comments: "The first line of the street address.",
  clean: util.types.toString,
});

export const state = input({
  label: "State",
  type: "string",
  required: false,
  placeholder: "Enter state",
  example: "CA",
  comments: "The state or region code.",
  clean: util.types.toString,
});

export const address2 = input({
  label: "Address 2",
  type: "string",
  required: false,
  placeholder: "Enter address line 2",
  example: "Apt 4B",
  comments: "The second line of the street address (apartment, suite, etc.).",
  clean: util.types.toString,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  placeholder: "Enter city",
  example: "San Francisco",
  comments: "The city name.",
  clean: util.types.toString,
});

export const province = input({
  label: "Province",
  type: "string",
  required: false,
  placeholder: "Enter province",
  example: "British Columbia",
  comments: "The province name (primarily for Canadian addresses).",
  clean: util.types.toString,
});

export const provinceCode = input({
  label: "Province Code",
  type: "string",
  required: false,
  placeholder: "Enter province code",
  example: "BC",
  comments: "The province code (primarily for Canadian addresses).",
  clean: util.types.toString,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  required: false,
  placeholder: "Enter postal code",
  example: "94105",
  comments: "The postal or ZIP code.",
  clean: util.types.toString,
});

export const country = input({
  label: "Country",
  type: "string",
  required: false,
  placeholder: "Enter country",
  example: "United States",
  comments: "The country name.",
  clean: util.types.toString,
});

export const countryCode = input({
  label: "Country Code",
  type: "string",
  required: false,
  placeholder: "Enter country code",
  example: "US",
  comments: "The two-letter ISO country code (e.g., US, CA, GB).",
  clean: util.types.toString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter title",
  example: "Product Manager",
  comments: "The title or job position.",
});

export const handle = input({
  label: "Handle",
  type: "string",
  required: false,
  placeholder: "Enter handle",
  example: "product-handle",
  comments: "The handle or unique identifier slug for the item.",
});
export const url = input({
  label: "URL",
  type: "string",
  required: false,
  placeholder: "Enter URL",
  example: "https://www.example.com",
  comments: "The URL address (include https://).",
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  placeholder: "Enter description",
  example: "This product features...",
  comments: "The description or summary.",
});

export const type = input({
  label: "Type",
  type: "string",
  required: false,
  placeholder: "Enter type",
  example: "physical",
  comments: "The type classification for the item.",
});

export const vendor = input({
  label: "Vendor",
  type: "string",
  required: false,
  placeholder: "Enter vendor name",
  example: "Acme Inc.",
  comments: "The vendor or manufacturer name.",
});

export const imageUrl = input({
  label: "Image URL",
  type: "string",
  required: false,
  placeholder: "Enter image URL",
  example: "https://cdn.example.com/images/product.jpg",
  comments: "The URL address for the image (include https://).",
});

export const orderId = input({
  label: "Order Id",
  type: "string",
  required: false,
  placeholder: "Enter order ID",
  example: "order_12345",
  comments: "The unique identifier for the order in the store.",
  dataSource: "selectOrder",
});

export const images = input({
  label: "Images",
  type: "string",
  collection: "valuelist",
  required: false,
  example:
    '{"id": "img_123", "url": "https://cdn.example.com/image.jpg", "variant_ids": ["var_1", "var_2"]}',
  comments:
    "Product images as an array of objects. Each object should contain 'id', 'url', and 'variant_ids' fields.",
});

export const fulfillmentStatus = input({
  label: "Fulfillment Status",
  type: "string",
  required: false,
  placeholder: "Select fulfillment status",
  example: "shipped",
  comments:
    "The fulfillment status of the order (e.g., 'pending', 'shipped', 'delivered').",
});

export const orderUrl = input({
  label: "Order Url",
  type: "string",
  required: false,
  placeholder: "Enter order URL",
  example: "https://www.example.com/orders/12345",
  comments: "The URL address for viewing the order (include https://).",
});

export const discountTotal = input({
  label: "Discount Total",
  type: "string",
  required: false,
  placeholder: "Enter discount total",
  example: "15.00",
  comments:
    "The total amount of discounts applied to the order in decimal format.",
});

export const shippingTotal = input({
  label: "Shipping Total",
  type: "string",
  required: false,
  placeholder: "Enter shipping total",
  example: "9.99",
  comments: "The total shipping cost in decimal format.",
});

export const discount = input({
  label: "Discount",
  type: "string",
  required: false,
  placeholder: "Enter discount amount",
  example: "10.00",
  comments: "The discount amount in decimal format.",
});

export const variantTitle = input({
  label: "Variant Title",
  type: "string",
  required: true,
  placeholder: "Enter variant title",
  example: "Size L - Blue",
  comments:
    "The title of the product variant. At least one variant is required for each product. A variant can use the same ID and title as the parent product.",
});

export const variantUrl = input({
  label: "Variant URL",
  type: "string",
  required: true,
  placeholder: "Enter variant URL",
  example: "https://www.example.com/products/variant123",
  comments: "The URL address for the product variant (include https://).",
});

export const variantSku = input({
  label: "Variant SKU",
  type: "string",
  required: true,
  placeholder: "Enter variant SKU",
  example: "SKU-12345-BLU-L",
  comments: "The Stock Keeping Unit (SKU) identifier for the variant product.",
});

export const variantPrice = input({
  label: "Variant Price",
  type: "string",
  required: true,
  placeholder: "Enter variant price",
  example: "89.95",
  comments: "The price of the variant product in decimal format.",
});

export const variantQuantity = input({
  label: "Variant Quantity",
  type: "string",
  required: true,
  placeholder: "Enter variant quantity",
  example: "50",
  comments: "The available quantity of the variant product.",
});

export const variantImageUrl = input({
  label: "Variant Image URL",
  type: "string",
  required: true,
  placeholder: "Enter variant image URL",
  example: "https://cdn.example.com/images/variant.jpg",
  comments: "The URL address for the variant product image (include https://).",
});

export const variantBackorders = input({
  label: "Variant Backorders",
  type: "string",
  required: true,
  placeholder: "Enter variant backorders",
  example: "allowed",
  comments:
    "The backorder status for the variant product (e.g., 'allowed', 'not-allowed').",
});

export const variantVisibility = input({
  label: "Variant Visibility",
  type: "string",
  required: true,
  placeholder: "Enter variant visibility",
  example: "visible",
  comments:
    "The visibility status of the variant product (e.g., 'visible', 'hidden').",
});

export const name = input({
  label: "Name",
  type: "string",
  required: true,
  placeholder: "Enter list name",
  example: "Newsletter Subscribers",
  comments: "The name of the audience list.",
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "+1-555-123-4567",
  comments: "The phone number in E.164 format or local format.",
  clean: util.types.toString,
});

export const subject = input({
  label: "Subject",
  type: "string",
  required: true,
  placeholder: "Enter email subject",
  example: "Your Monthly Newsletter",
  comments: "The subject line of the email.",
});

export const language = input({
  label: "Language",
  type: "string",
  required: true,
  placeholder: "Enter language",
  example: "en",
  comments:
    "The default language for this list's forms (use ISO 639-1 language code).",
  clean: util.types.toString,
});

export const fromName = input({
  label: "From Name",
  type: "string",
  required: true,
  placeholder: "Enter from name",
  example: "John Doe",
  comments:
    "The default 'from' name displayed for campaigns sent to this list.",
});

export const emailTypeOption = input({
  label: "Email Type Option",
  type: "boolean",
  required: true,
  comments:
    "When true, the list supports multiple email formats and subscribers can choose between HTML or plain-text emails. When false, subscribers will receive HTML emails with a plain-text alternative backup.",
  clean: util.types.toBool,
});

export const fromEmail = input({
  label: "From Email",
  type: "string",
  required: true,
  placeholder: "Enter from email address",
  example: "john.doe@example.com",
  comments: "The 'from' email address for the campaign.",
});

export const marketingPermissions = input({
  label: "Marketing Permissions",
  type: "boolean",
  required: true,
  default: "false",
  comments:
    "When true, the list has marketing permissions (e.g., GDPR) enabled.",
  clean: util.types.toBool,
});

export const permissionReminder = input({
  label: "Permission reminder",
  type: "string",
  required: true,
  placeholder: "Enter permission reminder",
  example:
    "You're receiving this email because you signed up for our newsletter.",
  comments:
    "The permission reminder text explaining why subscribers are receiving emails.",
});

export const savedSegmentId = input({
  label: "Saved Segment Id",
  type: "string",
  required: true,
  placeholder: "Enter saved segment ID",
  example: "12345",
  comments: "The unique identifier for an existing saved segment.",
});

export const prebuiltSegmentId = input({
  label: "Prebuilt Segment Id",
  type: "string",
  required: true,
  placeholder: "Enter prebuilt segment ID",
  example: "segment_123",
  comments: "The unique identifier for the prebuilt segment.",
});

export const match = input({
  label: "Match",
  type: "string",
  required: true,
  placeholder: "Select match type",
  example: "all",
  comments:
    "The segment match type. Use 'all' to match all conditions or 'any' to match any condition.",
});

export const conditions = input({
  label: "Conditions",
  type: "string",
  required: true,
  placeholder: "Enter conditions",
  example: "subscribed",
  comments:
    "Segment match conditions. See [Mailchimp's condition types documentation](https://mailchimp.com/developer/marketing/docs/segmentation-conditions/) for available condition types.",
});

export const previewText = input({
  label: "Preview Text",
  type: "string",
  required: false,
  placeholder: "Enter preview text",
  example: "Check out our latest updates and offers",
  comments:
    "The preview text displayed in email clients before opening the email.",
});

export const replyTo = input({
  label: "Reply To",
  type: "string",
  required: true,
  placeholder: "Enter reply-to email",
  example: "reply@example.com",
  comments: "The reply-to email address for the campaign.",
});

export const subjectLine = input({
  label: "Subject line",
  type: "string",
  required: true,
  placeholder: "Enter subject line",
  example: "Your Weekly Update",
  comments: "The subject line for the campaign.",
});

export const templateId = input({
  label: "Template Id",
  type: "string",
  required: false,
  placeholder: "Enter template ID",
  example: "12345",
  comments: "The unique identifier for the template to use.",
});

export const toName = input({
  label: "To Name",
  type: "string",
  required: true,
  placeholder: "Enter to name",
  example: "*|FNAME|*",
  comments:
    "The campaign's custom 'To' name, typically using a merge tag like *|FNAME|* for the recipient's first name.",
});

export const autoFbPost = input({
  label: "Auto FB Posts",
  type: "string",
  collection: "valuelist",
  required: true,
  example: '["123456789", "987654321"]',
  comments:
    "An array of Facebook page IDs to automatically post the campaign to.",
});

export const scheduleTime = input({
  label: "Schedule Time",
  type: "string",
  required: true,
  placeholder: "Enter schedule time (ISO 8601 format)",
  example: "2025-12-25T10:00:00Z",
  comments:
    "The UTC date and time to schedule the campaign for delivery in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). Campaigns may only be scheduled on the quarter-hour (:00, :15, :30, :45).",
});

export const timewarp = input({
  label: "Time Warp",
  type: "string",
  collection: "valuelist",
  required: true,
  example: "true",
  comments:
    "When enabled, the campaign uses Timewarp to send at the scheduled time in each recipient's local time zone. For example, a scheduleTime of 13:00 will deliver at 1:00 PM in each recipient's time zone.",
});

export const subscriberHash = input({
  label: "SubscriberHash",
  type: "string",
  required: true,
  placeholder: "Enter subscriber hash or email address",
  example: "b0a7d3c2f1e4a9b6c8d5e7f0a1b2c3d4",
  comments:
    "The MD5 hash of the lowercase version of the list member's email address (32-character hex string). This endpoint also accepts plain email addresses in place of the hash.",
  dataSource: "selectMember",
});

export const status = input({
  label: "Status",
  type: "string",
  required: true,
  placeholder: "Enter status",
  example: "subscribed",
  comments: `The subscriber's current status. Possible values: "subscribed", "unsubscribed", "cleaned", "pending", or "transactional".`,
  clean: util.types.toString,
});

export const emailType = input({
  label: "Email Type",
  type: "string",
  required: false,
  placeholder: "Enter email type",
  example: "html",
  comments: `The type of email format the member prefers: 'html' or 'text'.`,
  clean: util.types.toString,
});

export const mergeFields = input({
  label: "Merge Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: `Merge fields (audience fields) as key-value pairs where the key is the merge tag. See [Mailchimp's merge fields documentation](https://mailchimp.com/developer/marketing/docs/merge-fields/).`,
  example: '{"FNAME": "John", "LNAME": "Doe"}',
  placeholder: "Enter merge field values",
  clean: (values: unknown) =>
    util.types.keyValPairListToObject((values || []) as KeyValuePair[]),
});

export const interests = input({
  label: "Interests",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Interest categories as key-value pairs where the key is the interest ID and the value is true/false.",
  example: '{"a1b2c3d4e5": "true", "f6g7h8i9j0": "false"}',
  placeholder: "Enter interest ID and value pairs",
  clean: (values: unknown) =>
    util.types.keyValPairListToObject((values || []) as KeyValuePair[]),
});

export const vip = input({
  label: "VIP",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, marks the subscriber as a VIP member with priority status.",
  clean: util.types.toBool,
});

export const tags = input({
  label: "Tags",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Tags associated with the member. Provide a list of tag names.",
  example: '["VIP Customer", "Newsletter Subscriber"]',
  placeholder: "Enter tag names",
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  placeholder: "Enter webhook URL",
  example: "https://example.com/webhooks/mailchimp",
  comments:
    "The URL where the webhook will send requests. You can use this input to configure a component trigger.",
  clean: util.types.toString,
});

export const webhookDescription = input({
  label: "Description",
  type: "string",
  required: true,
  placeholder: "Enter webhook description",
  example: "Notify when subscribers join or leave",
  comments: "A description of what the webhook does.",
});

export const webhookEvents = input({
  label: "Events",
  type: "string",
  model: WEBHOOK_EVENTS_MODEL,
  collection: "valuelist",
  required: true,
  comments:
    "Select the events that will trigger the webhook (e.g., subscribe, unsubscribe, profile update).",
  clean: toWebhookEvents,
});

export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  placeholder: "Enter webhook ID",
  example: "f4c8b5d2e3",
  comments:
    "The unique identifier for the webhook (10-character alphanumeric string).",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const webhookSources = input({
  label: "Sources",
  type: "string",
  model: WEBHOOK_SOURCES_MODEL,
  collection: "valuelist",
  required: true,
  comments:
    "Select the sources that should trigger the webhook. <strong>User:</strong> changes made by subscribers, <strong>Admin:</strong> changes made by account admins, <strong>API:</strong> changes made via the API.",
  clean: toWebhookSources,
});

export const count = input({
  label: "Result Count",
  type: "string",
  required: false,
  placeholder: "Enter number of results",
  example: "50",
  comments:
    "The maximum number of results to return per page (1-1000). Defaults to 10 if not specified.",
  clean: toOptionalNumber,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  placeholder: "Enter offset value",
  example: "10",
  comments:
    "The number of records to skip before returning results. Use with Count for pagination (e.g., offset 10 with count 50 returns records 11-60).",
  clean: toOptionalNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically paginates through all results to fetch all records. The Count and Offset inputs are ignored when this is enabled.",
  clean: util.types.toBool,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Mailchimp connection to use.",
});

export const skipMerged = input({
  label: "Skip Merge Fields",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, member data will be accepted without merge field values, even if the merge field is usually required.",
  clean: util.types.toBool,
});

export const marketingPermissionsArray = input({
  label: "Marketing Permissions",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The marketing permissions for the subscriber as an array of objects. Each object should contain 'marketing_permission_id' and 'enabled' fields.",
  example: JSON.stringify(
    [
      {
        marketing_permission_id: "exampleId",
        enabled: true,
      },
    ],
    null,
    2,
  ),
  clean: toOptionalString,
});


export const listWebhooksInputs = {
  connection: connectionInput,
  listId,
};

export const getWebhookInputs = {
  connection: connectionInput,
  listId,
  webhookId,
};

export const addWebhookInputs = {
  connection: connectionInput,
  listId,
  webhookUrl,
  webhookEvents,
  webhookSources,
};

export const webhookTriggerInputs = {
  connection: connectionInput,
  listId,
  webhookEvents,
  webhookSources,
};

export const updateWebhookInputs = {
  connection: connectionInput,
  listId,
  webhookId,
  webhookUrl,
  webhookEvents,
  webhookSources,
};

export const deleteWebhookInputs = getWebhookInputs;
