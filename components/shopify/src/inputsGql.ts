import { input, util } from "@prismatic-io/spectral";
import {
  LIST_COLLECTIONS_DATASOURCE_REFERENCE,
  LIST_CUSTOMERS_DATASOURCE_REFERENCE,
  LIST_DRAFT_ORDERS_DATASOURCE_REFERENCE,
  LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
  LIST_FULFILLMENT_SERVICES_DATASOURCE_REFERENCE,
  LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
  LIST_LOCATIONS_DATASOURCE_REFERENCE,
  LIST_ORDERS_DATASOURCE_REFERENCE,
  LIST_PRODUCTS_DATASOURCE_REFERENCE,
  WEBHOOK_TOPICS,
} from "./constants";
import {
  cleanArrayCodeInput,
  cleanCodeInputEmptyObject,
  cleanCustomerId,
  cleanDraftOrderId,
  cleanFulfillmentId,
  cleanFulfillmentOrderId,
  cleanLocationId,
  cleanOptionalBooleanInput,
  cleanOrderId,
  cleanProductId,
  cleanProductIdForVariant,
  cleanStringInput,
  cleanValueListInput,
  generateModelFromSnakeCaseArray,
} from "./util";

const shopifyConnection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Shopify connection to use.",
});

export const countCollectsInputs = {
  shopifyConnection,
};

const collectIdGql = input({
  label: "Collect Id",
  type: "string",
  required: true,
  comments: "The unique identifier for the collect.",
  example: "gid://shopify/Collection/123456789",
  placeholder: "Enter collect ID",
  clean: util.types.toString,
});

export const deleteCollectInputs = {
  shopifyConnection,
  collectIdGql,
};

export const getCollectInputs = {
  shopifyConnection,
  collectIdGql,
};

const getAlldata = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. The API is limited to 250 records per page max.",
  clean: util.types.toBool,
});

const productId = input({
  label: "Product ID",
  type: "string",
  required: true,
  example: "108828309 or gid://shopify/Product/108828309",
  placeholder: "Enter product ID",
  comments: "The unique identifier for the product.",
  clean: cleanProductId,
  dataSource: LIST_PRODUCTS_DATASOURCE_REFERENCE,
});

const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 250.",
  example: "20",
  placeholder: "Enter limit",
  clean: util.types.toNumber,
});

const endCursor = input({
  label: "Page Offset Cursor",
  type: "string",
  required: false,
  comments:
    "Cursor for pagination. Use the value from the previous response to retrieve the next page of results.",
  example:
    "eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6OTAyOTk2ODAwMzM1NCwibGFzdF92YWx1ZSI6IlRoZSBDb2xsZWN0aW9uIFNub3dib2FyZDogTGlxdWlkIn0",
  placeholder: "Enter page cursor",
  clean: cleanStringInput,
});

export const listCollectsInputs = {
  shopifyConnection,
  getAlldata,
  limit,
  endCursor,
};

export const listCurrenciesInputs = {
  shopifyConnection,
  limit,
  getAlldata,
  endCursor,
};

export const countCustomersInputs = {
  shopifyConnection,
};

const customerIdGql = input({
  label: "Customer",
  type: "string",
  required: true,
  example: "5940139491234 or gid://shopify/Customer/5940139491234",
  comments: "The unique identifier for the customer.",
  placeholder: "Enter customer ID",
  clean: cleanCustomerId,
  dataSource: LIST_CUSTOMERS_DATASOURCE_REFERENCE,
});

export const createAccountActivationURLInputs = {
  shopifyConnection,
  customerIdGql,
};

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  example: "John",
  placeholder: "Enter first name",
  comments: "The first name of the customer.",
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  example: "Doe",
  placeholder: "Enter last name",
  comments: "The last name of the customer.",
  clean: util.types.toString,
});

const email = input({
  label: "Email",
  type: "string",
  required: true,
  example: "someone@example.com",
  placeholder: "Enter email address",
  comments: "The email address of the customer.",
  clean: util.types.toString,
});

const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  example: "+18005555454",
  placeholder: "Enter phone number",
  comments: "The phone number of the customer.",
  clean: cleanStringInput,
});

const addressListGql = input({
  label: "Address List",
  type: "code",
  language: "json",
  comments: "Provide a JSON array containing address objects.",
  required: false,
  example: JSON.stringify([
    {
      address1: "",
      address2: "",
      city: "",
      company: "",
      countryCode: "",
      firstName: "",
      lastName: "",
      phone: "",
      provinceCode: "",
      zip: "",
    },
  ]),
  clean: (value) => cleanArrayCodeInput(value, "Address List"),
});

const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  example: "This is an example note.",
  placeholder: "Enter note",
  comments: "A note about the customer.",
  clean: cleanStringInput,
});

const tags = input({
  label: "Tags",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "Style",
  placeholder: "Enter tag",
  comments: "For each list item, provide a string you would like to tag the product with.",
  clean: cleanValueListInput,
});

const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional fields that might not be covered by the standard inputs. This is a JSON object.",
  example: JSON.stringify({
    note: "This is an example note.",
    tags: ["Style"],
  }),
  clean: (value) => cleanCodeInputEmptyObject(value, "Additional Fields"),
});

const taxExempt = input({
  label: "Tax Exempt",
  type: "boolean",
  required: false,
  comments: "Determines if the customer is tax exempt.",
  default: "false",
  clean: util.types.toBool,
});

const metafields = input({
  label: "Metafields",
  type: "code",
  language: "json",
  comments: "Provide a JSON array containing metadata objects.",
  required: false,
  example: JSON.stringify([
    {
      key: "myKey",
      value: "myValue",
      type: "single_line_text_field",
      namespace: "global",
    },
  ]),
  clean: (value) => cleanArrayCodeInput(value, "Metafields"),
});

export const createCustomerInputs = {
  shopifyConnection,
  firstName,
  lastName,
  email,
  addressListGql,
  phone,
  notes,
  tags,
  taxExempt,
  metafields,
  additionalFields,
};

const optionalBoolean = input({
  label: "Optional Boolean",
  type: "string",
  required: false,
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
  ],
  default: undefined,
  clean: cleanOptionalBooleanInput,
});

export const updateCustomerInputs = {
  shopifyConnection,
  customerIdGql,
  firstName: input({
    ...firstName,
    required: false,
    clean: cleanStringInput,
  }),
  lastName: input({
    ...lastName,
    required: false,
    clean: cleanStringInput,
  }),
  email: input({
    ...email,
    required: false,
    clean: cleanStringInput,
  }),
  addressListGql,
  phone,
  notes,
  tags: input({
    ...tags,
    clean: (value: unknown) => cleanValueListInput(value, true),
  }),
  taxExempt: input({
    ...taxExempt,
    ...optionalBoolean,
    label: "Tax Exempt",
  }),
  metafields,
  additionalFields,
};

export const deleteCustomerInputs = {
  shopifyConnection,
  customerIdGql,
};

export const getCustomerInputs = {
  shopifyConnection,
  customerIdGql,
};

export const listCustomersInputs = {
  shopifyConnection,
  getAlldata,
  limit,
  endCursor,
};

export const listCollectionsInputs = {
  shopifyConnection,
  limit,
  getAlldata,
  endCursor,
};

export const listDraftOrdersInputs = {
  shopifyConnection,
  limit,
  getAlldata,
  endCursor,
};

const draftOrderId = input({
  label: "Draft Order Id",
  type: "string",
  required: true,
  example: "916042021234 or gid://shopify/DraftOrder/916042021234",
  placeholder: "Enter draft order ID",
  comments: "The unique identifier for the draft order.",
  clean: cleanDraftOrderId,
  dataSource: LIST_DRAFT_ORDERS_DATASOURCE_REFERENCE,
});

export const getDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};

export const deleteDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};

const lineItems = input({
  label: "Line items",
  type: "code",
  required: true,
  language: "json",
  example: JSON.stringify(
    [
      {
        title: "Custom product",
        originalUnitPrice: 14.99,
        quantity: 5,
        appliedDiscount: {
          description: "wholesale",
          value: 5,
          amount: 3.74,
          valueType: "PERCENTAGE",
          title: "Fancy",
        },
        weight: {
          value: 1,
          unit: "KILOGRAMS",
        },
        customAttributes: [
          {
            key: "color",
            value: "Gold",
          },
          {
            key: "material",
            value: "Plastic",
          },
        ],
      },
    ],
    null,
    2,
  ),

  comments: "Provide a JSON array containing line item objects.",
  clean: (value) => cleanArrayCodeInput(value, "Line items"),
});

const useCustomerAddress = input({
  label: "Use Customer Address",
  type: "boolean",
  required: true,
  default: "true",
  comments: "This flag determines if the order will use the customers default address.",
  clean: util.types.toBool,
});

const note = input({
  label: "Note",
  type: "string",
  required: false,
  example: "Test draft order",
  placeholder: "Enter note",
  comments: "A note on the draft order.",
  clean: cleanStringInput,
});

export const createDraftOrderInputs = {
  shopifyConnection,
  customerIdGql,
  lineItems,
  useCustomerAddress,
  note,
  taxExempt: input({
    ...taxExempt,
    required: false,
    default: "false",
    comments: "Whether or not taxes are exempt for the draft order.",
  }),
  tags: input({
    ...tags,
    comments: "Provide a list of tags for the draft order.",
  }),
  additionalFields,
};

export const completeDraftOrderInputs = {
  shopifyConnection,
  draftOrderId,
};
const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  example: "10079785100 or gid://shopify/Order/10079785100",
  placeholder: "Enter order ID",
  comments: "The unique identifier for the order.",
  clean: cleanOrderId,
  dataSource: LIST_ORDERS_DATASOURCE_REFERENCE,
});

export const listFulfillmentOrdersInputs = {
  shopifyConnection,
  orderId,
  limit,
  getAlldata,
  endCursor,
};

const fulfillmentId = input({
  label: "Fulfillment Id",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment.",
  example: "5154544124321 or gid://shopify/Fulfillment/5154544124321",
  placeholder: "Enter fulfillment ID",
  clean: cleanFulfillmentId,
  dataSource: LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
});

export const getFulfillmentInputs = {
  shopifyConnection,
  fulfillmentId,
};

const fulfillmentOrderId = input({
  label: "Fulfillment Order ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment order.",
  example: "564786110 or gid://shopify/FulfillmentOrder/564786110",
  placeholder: "Enter fulfillment order ID",
  clean: cleanFulfillmentOrderId,
  dataSource: LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
});

export const getFulfillmentOrderInputs = {
  shopifyConnection,
  fulfillmentOrderId,
};

export const listFulfillmentServicesInputs = {
  shopifyConnection,
};

const fulfillmentServiceId = input({
  label: "Fulfillment Service ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment service.",
  example: "gid://shopify/FulfillmentService/18961920?id=true",
  placeholder: "Enter fulfillment service ID",
  clean: util.types.toString,
  dataSource: LIST_FULFILLMENT_SERVICES_DATASOURCE_REFERENCE,
});

export const getFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
};

const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  example: "https://example.com",
  placeholder: "Enter callback URL",
  comments: "The callback URL that the fulfillment service has registered for request.",
  clean: util.types.toString,
});
const inventoryManagement = input({
  label: "Inventory Management",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "Whether the fulfillment services tracks product inventory and provides updates to Shopify.",
  clean: util.types.toBool,
});

const fulfillmentServiceName = input({
  label: "Fulfillment Service Name",
  type: "string",
  required: true,
  comments: "The name of the fulfillment service.",
  example: "MyFulfillmentService",
  placeholder: "Enter fulfillment service name",
  clean: util.types.toString,
});

const trackingSupport = input({
  label: "Tracking Support",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Whether the fulfillment service supports tracking numbers for packages.",
  clean: util.types.toBool,
});

export const createFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceName,
  callbackUrl,
  inventoryManagement,
  trackingSupport,
};

export const updateFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
  fulfillmentServiceName: input({
    ...fulfillmentServiceName,
    required: false,
    clean: cleanStringInput,
  }),
  callbackUrl: input({
    ...callbackUrl,
    required: false,
    clean: cleanStringInput,
  }),
  inventoryManagement: input({
    ...inventoryManagement,
    ...optionalBoolean,
    label: "Inventory Management",
  }),

  trackingSupport: input({
    ...trackingSupport,
    ...optionalBoolean,
    label: "Tracking Support",
  }),
};

export const deleteFulfillmentServiceInputs = {
  shopifyConnection,
  fulfillmentServiceId,
};

const query = input({
  label: "Query",
  type: "string",
  required: false,
  comments: "The query to filter the inventory items.",
  example: "id:>=30322695",
  placeholder: "Enter query filter",
  clean: cleanStringInput,
});

export const listInventoryItemsInputs = {
  shopifyConnection,
  query,
  getAlldata,
  limit,
  endCursor,
};

const itemId = input({
  label: "Inventory Item Id",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory item.",
  example: "gid://shopify/InventoryItem/43933612241234",
  placeholder: "Enter inventory item ID",
  clean: util.types.toString,
});

export const getInventoryItemsInputs = {
  itemId,
  shopifyConnection,
};

const cost = input({
  label: "Cost",
  type: "string",
  required: false,
  example: "1.00",
  placeholder: "Enter cost",
  comments:
    "Unit cost associated with the inventory item, the currency is the shop's default currency.",
  clean: cleanStringInput,
});

const sku = input({
  label: "SKU",
  type: "string",
  required: false,
  example: "97802837847",
  placeholder: "Enter SKU",
  comments: "The SKU (stock keeping unit) of the inventory item.",
});

const tracked = input({
  ...optionalBoolean,
  label: "Tracked",
  comments: "Whether the inventory item is tracked.",
});

export const updateInventoryItemsInputs = {
  shopifyConnection,
  itemId,
  sku,
  cost,
  tracked,
};

const locationId = input({
  label: "Location ID",
  type: "string",
  required: true,
  comments: "The ID of the location that the inventory level belongs to.",
  example: "346779380 or gid://shopify/Location/346779380",
  placeholder: "Enter location ID",
  clean: cleanLocationId,
  dataSource: LIST_LOCATIONS_DATASOURCE_REFERENCE,
});

export const listInventoryLevelsInputs = {
  shopifyConnection,
  locationId,
  getAlldata,
  limit,
  endCursor,
};

export const listLocationsInputs = {
  shopifyConnection,
  limit,
  getAlldata,
  endCursor,
};

const levelId = input({
  label: "Inventory Level Id",
  type: "string",
  required: true,
  comments: "The unique identifier for the inventory level.",
  example: "gid://shopify/InventoryLevel/100340760123?inventory_item_id=43933612245123",
  placeholder: "Enter inventory level ID",
  clean: util.types.toString,
});

export const getInventoryLevelsInputs = {
  shopifyConnection,
  levelId,
};

export const deleteInventoryLevelsInputs = {
  shopifyConnection,
  levelId: input({
    ...levelId,
    example: "gid://shopify/InventoryLevel/820859520?inventory_item_id=826867926",
    placeholder: "gid://shopify/InventoryLevel/820859520?inventory_item_id=826867926",
  }),
};

export const connectInventoryLevelInputs = {
  shopifyConnection,
  locationId,
  itemId,
};

export const countLocationsInputs = {
  shopifyConnection,
};

export const getLocationInputs = {
  shopifyConnection,
  locationId,
};

const notifyCustomer = input({
  label: "Notify Customer",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Whether the customer should be notified of the cancellation.",
  clean: util.types.toBool,
});

const reason = input({
  label: "Reason",
  type: "string",
  required: true,
  example: "CUSTOMER",
  placeholder: "Select reason",
  comments: "The reason for the cancellation.",
  model: [
    {
      label: "Customer",
      value: "CUSTOMER",
    },
    {
      label: "Declined",
      value: "DECLINED",
    },
    {
      label: "Fraud",
      value: "FRAUD",
    },
    {
      label: "Inventory",
      value: "INVENTORY",
    },
    {
      label: "Other",
      value: "OTHER",
    },
    {
      label: "Staff",
      value: "STAFF",
    },
  ],
  clean: util.types.toString,
});

const refund = input({
  label: "Refund",
  type: "boolean",
  required: true,
  comments: "Whether to refund the amount paid by the customer.",
  clean: util.types.toBool,
});

const restock = input({
  label: "Restock",
  type: "boolean",
  required: true,
  comments: "Whether to restock the inventory committed to the order.",
  clean: util.types.toBool,
});

const staffNote = input({
  label: "Staff Note",
  type: "string",
  required: false,
  comments:
    "A staff-facing note about the order cancellation. This is not visible to the customer.",
  example: "This is a staff note.",
  placeholder: "Enter staff note",
  clean: cleanStringInput,
});

export const cancelOrderInputs = {
  shopifyConnection,
  orderId,
  reason,
  refund,
  restock,
  notifyCustomer,
  staffNote,
};

export const listOrdersInputs = {
  shopifyConnection,
  query: input({
    ...query,
    comments: "The query to filter the orders.",
    placeholder: "updated_at:>2019-12-01",
    example: "updated_at:>2019-12-01",
  }),
  getAlldata,
  limit,
  endCursor,
};

export const closeOrderInputs = {
  shopifyConnection,
  orderId,
};

export const countOrdersInputs = {
  shopifyConnection,
};

const orderData = input({
  label: "Order Data",
  type: "code",
  language: "json",
  comments: "JSON data to be sent as the Order payload.",
  required: true,
  example: JSON.stringify(
    {
      currency: "EUR",
      lineItems: [
        {
          title: "Big Brown Bear Boots",
          priceSet: {
            shopMoney: {
              amount: 74.99,
              currencyCode: "EUR",
            },
          },
          quantity: 3,
          taxLines: [
            {
              priceSet: {
                shopMoney: {
                  amount: 10.2,
                  currencyCode: "EUR",
                },
              },
              rate: 0.06,
              title: "State tax",
            },
          ],
        },
      ],
      transactions: [
        {
          kind: "SALE",
          status: "SUCCESS",
          amountSet: {
            shopMoney: {
              amount: 238.47,
              currencyCode: "EUR",
            },
          },
        },
      ],
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Order Data"),
});

export const createOrderInputs = {
  shopifyConnection,
  orderData,
};

export const getOrderInputs = {
  shopifyConnection,
  orderId,
};

export const deleteOrderInputs = {
  shopifyConnection,
  orderId,
};

export const countProductImagesInputs = {
  shopifyConnection,
  productId,
};

const imageURL = input({
  label: "Image URL",
  type: "string",
  required: true,
  example: "https://example.com/image.jpg",
  placeholder: "Enter image URL",
  comments: "Provide the URL of the image.",
  clean: util.types.toString,
});

const imageAlt = input({
  label: "Image Alt Text",
  type: "string",
  required: true,
  example: "Alt text",
  placeholder: "Enter alt text",
  comments: "Provide the alt text for the image.",
  clean: util.types.toString,
});

export const createProductImageInputs = {
  shopifyConnection,
  productId,
  imageURL,
  imageAlt,
};

const imageId = input({
  label: "Image ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product image.",
  example: "gid://shopify/MediaImage/916933471",
  placeholder: "Enter image ID",
  clean: util.types.toString,
});

export const deleteProductImageInputs = {
  shopifyConnection,
  productId,
  imageId,
};

export const listProductImagesInputs = {
  shopifyConnection,
  productId,
  getAlldata,
  limit,
  endCursor,
};

export const getShopConfigInputs = {
  shopifyConnection,
};

export const listVariantsInputs = {
  shopifyConnection,
  productId: input({
    ...productId,
    example: "108828309",
    placeholder: "108828309",
    clean: cleanProductIdForVariant,
  }),
  getAlldata,
  limit,
  endCursor,
};

export const countVariantsInputs = {
  shopifyConnection,
  
};

const variant = input({
  label: "Variant",
  type: "code",
  language: "json",
  required: true,
  comments: "Provide a JSON object containing the variant data.",
  example: JSON.stringify(
    {
      price: 14.99,
      compareAtPrice: 19.99,
      optionValues: [
        {
          name: "Golden",
          optionId: "gid://shopify/ProductOption/328272167",
        },
      ],
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Variant"),
});

export const createVariantInputs = {
  shopifyConnection,
  productId,
  variant,
};

const variantId = input({
  label: "Variant ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product variant.",
  example: "gid://shopify/ProductVariant/1070325177",
  placeholder: "Enter variant ID",
  clean: util.types.toString,
});

export const deleteVariantInputs = {
  shopifyConnection,
  productId,
  variantId,
};

export const getVariantInputs = {
  shopifyConnection,
  variantId,
};

const updateVariant = input({
  label: "Update Variant",
  type: "code",
  language: "json",
  required: true,
  comments: "Provide a JSON object containing the variant data to update.",
  example: JSON.stringify(
    {
      id: "gid://shopify/ProductVariant/1",
      barcode: "12345",
      price: "100.57",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Update Variant"),
});

export const updateVariantInputs = {
  shopifyConnection,
  productId,
  updateVariant,
};

const webhookTopic = input({
  label: "Webhook Topic",
  type: "string",
  required: true,
  example: "APP_PURCHASES_ONE_TIME_UPDATE",
  placeholder: "Select webhook topic",
  model: generateModelFromSnakeCaseArray(WEBHOOK_TOPICS),
  comments: "The topic for the webhook. This is the event that will trigger the webhook.",
  clean: util.types.toString,
});

const callbackWebhookUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  example: "https://example.com/webhook",
  placeholder: "Enter callback URL",
  comments: "Provide a string value for the URL the newly created webhook will post to.",
  clean: util.types.toString,
});

const webhookFormat = input({
  label: "Webhook Format",
  type: "string",
  required: true,
  model: [
    { label: "JSON", value: "JSON" },
    { label: "XML", value: "XML" },
  ],
  default: "JSON",
  comments: "Provide a string value for the format you would like your webhook to return.",
});

export const createWebhookInputs = {
  shopifyConnection,
  webhookTopic,
  callbackWebhookUrl,
  webhookFormat,
};

const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  comments: "Show only webhooks that point to this instance.",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});

export const listWebhooksInputs = {
  shopifyConnection,
  showOnlyInstanceWebhooks,
  getAlldata,
  limit,
  endCursor,
  callbackUrl: input({
    ...callbackUrl,
    required: false,
    comments: "Filter webhooks by callback URL.",
    clean: cleanStringInput,
  }),
};

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the webhook.",
  example: "gid://shopify/WebhookSubscription/525699895",
  placeholder: "Enter webhook ID",
  clean: util.types.toString,
});

export const deleteWebhookInputs = {
  shopifyConnection,
  webhookId,
};

export const deleteInstanceWebhooksInputs = { shopifyConnection };

const webhookTopics = input({
  ...webhookTopic,
  collection: "valuelist",
  clean: cleanValueListInput,
});

const secretKey = input({
  label: "Secret Key",
  type: "string",
  required: true,
  comments: "The Shopify app's client secret, viewable from the Partner Dashboard.",
  clean: util.types.toString,
});

export const eventTopicWebhookInputs = {
  shopifyConnection,
  secret_key: secretKey,
  webhookTopics,
};

export const selectOrdersInputs = {
  shopifyConnection,
};

export const selectFulfillmentOrdersInputs = {
  shopifyConnection,
  orderId: {
    ...orderId,
    dataSource: undefined,
  },
};

export const selectLocationsInputs = {
  shopifyConnection,
};

export const selectCustomersInputs = {
  shopifyConnection,
};

export const selectDraftOrdersInputs = {
  shopifyConnection,
};

export const selectCollectionsInputs = {
  shopifyConnection,
};

export const selectFulfillmentServicesInputs = {
  shopifyConnection,
};

export const listProducstInputs = {
  shopifyConnection,
  limit,
  getAlldata,
  endCursor,
};

export const getProductInputs = {
  shopifyConnection,
  productId,
};

export const deleteProductInputs = {
  shopifyConnection,
  productId,
};

const title = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Example Product",
  placeholder: "Enter product title",
  comments: "Provide a string value for the title of the product.",
  clean: util.types.toString,
});

const vendor = input({
  label: "Vendor",
  type: "string",
  required: true,
  example: "Burton inc.",
  placeholder: "Enter vendor name",
  comments: "Provide a value for the vendor of the product.",
  clean: util.types.toString,
});

const productType = input({
  label: "Product Type",
  type: "string",
  required: true,
  example: "T-shirt",
  placeholder: "Enter product type",
  comments: "Provide a value for the type of product.",
  clean: util.types.toString,
});

const productStatus = input({
  label: "Product Status",
  type: "string",
  required: true,
  model: [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
    { label: "Archived", value: "ARCHIVED" },
  ],
  comments: "Specify the status of the product.",
  clean: util.types.toString,
});

const descriptionHtml = input({
  label: "Description HTML",
  type: "string",
  required: true,
  example: "<p>This is an example product.</p>",
  placeholder: "Enter product description HTML",
  comments: "Provide an HTML string for the description of the product.",
  clean: util.types.toString,
});

export const createProductInputs = {
  shopifyConnection,
  title,
  descriptionHtml,
  productType,
  vendor,
  productStatus,
  imageUrl: input({
    ...imageURL,
    required: false,
    comments: "Provide a URL for the image of the product.",
    clean: cleanStringInput,
  }),
  imageAlt: input({
    ...imageAlt,
    required: false,
    comments: "Provide the alt text for the image of the product.",
    clean: cleanStringInput,
  }),
  tags: input({
    ...tags,
    comments: "Provide a list of tags for the product.",
    example: "Style",
    placeholder: "Style",
    clean: cleanValueListInput,
  }),
  additionalFields,
};

export const updateProductInputs = {
  shopifyConnection,
  productId,
  title: input({
    ...title,
    required: false,
    clean: cleanStringInput,
  }),
  descriptionHtml: input({
    ...descriptionHtml,
    required: false,
    clean: cleanStringInput,
  }),
  productType: input({
    ...productType,
    required: false,
    clean: cleanStringInput,
  }),
  vendor: input({
    ...vendor,
    required: false,
    clean: cleanStringInput,
  }),
  productStatus: input({
    ...productStatus,
    required: false,
    clean: cleanStringInput,
  }),
  imageUrl: input({
    ...createProductInputs.imageUrl,
    required: false,
    clean: cleanStringInput,
  }),
  imageAlt: input({
    ...createProductInputs.imageAlt,
    required: false,
    clean: cleanStringInput,
  }),
  tags,
  additionalFields,
};

export const countProductsInputs = {
  shopifyConnection,
};

export const selectProductsInputs = {
  shopifyConnection,
};

export const listFulfillmentsInputs = {
  shopifyConnection,
  orderId,
};

export const selectFulfillmentsInputs = { shopifyConnection, orderId };

export const getProductImageInputs = {
  shopifyConnection,
  productId,
  imageId: input({
    ...imageId,
    example: "916933471",
    placeholder: "916933471",
    comments: "Provide a unique ID of a product image. Use only the ID number.",
  }),
};

const collectionId = input({
  label: "Collection ID",
  type: "string",
  required: true,
  example: "gid://shopify/Collection/841564295",
  placeholder: "Enter collection ID",
  comments: "The unique identifier for the collection.",
  clean: util.types.toString,
  dataSource: LIST_COLLECTIONS_DATASOURCE_REFERENCE,
});

export const getCollectionInputs = {
  shopifyConnection,
  collectionId,
};

export const countCollectionsInputs = {
  shopifyConnection,
};

export const deleteCollectionInputs = {
  shopifyConnection,
  collectionId,
};

const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  example: "gid://shopify/Product/20995642",
  placeholder: "Enter resource ID",
  comments: "The unique identifier for the resource.",
  clean: util.types.toString,
});

export const listMetafieldsInputs = {
  shopifyConnection,
  resource,
  limit,
  getAlldata,
  endCursor,
};

const key = input({
  label: "Key",
  type: "string",
  required: true,
  example: "myKey",
  placeholder: "Enter key",
  comments: "The key for the metafield.",
  clean: util.types.toString,
});

const value = input({
  label: "Value",
  type: "string",
  required: true,
  example: "myValue",
  placeholder: "Enter value",
  comments: "The value for the metafield.",
  clean: util.types.toString,
});

const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: true,
  example: "gid://shopify/Product/20995642",
  placeholder: "Enter owner ID",
  comments: "The unique ID of the owner of the metafield.",
  clean: util.types.toString,
});

const type = input({
  label: "Type",
  type: "string",
  required: false,
  model: [
    { label: "Boolean", value: "boolean" },
    { label: "Color", value: "color" },
    { label: "Date", value: "date" },
    { label: "Date Time", value: "date_time" },
    { label: "Dimension", value: "dimension" },
    { label: "Id", value: "id" },
    { label: "Json", value: "json" },
    { label: "Link", value: "link" },
    { label: "Money", value: "money" },
    { label: "Multi Line Text Field", value: "multi_line_text_field" },
    { label: "Number Decimal", value: "number_decimal" },
    { label: "Number Integer", value: "number_integer" },
    { label: "Rating", value: "rating" },
    { label: "Rich Text Field", value: "rich_text_field" },
    { label: "Single Line Text Field", value: "single_line_text_field" },
    { label: "Url", value: "url" },
    { label: "Volume", value: "volume" },
    { label: "Weight", value: "weight" },
  ],
  example: "single_line_text_field",
  placeholder: "Select metafield type",
  comments:
    "Provide a type for the metafield. Required when there is no corresponding definition for the given namespace, key, and owner resource type.",
  clean: cleanStringInput,
});

const namespace = input({
  label: "Namespace",
  type: "string",
  required: false,
  example: "global",
  placeholder: "Enter namespace",
  comments: "The namespace for the metafield.",
  clean: cleanStringInput,
});

export const setMetafieldInputs = {
  shopifyConnection,
  key,
  value,
  ownerId,
  type,
  namespace,
};

export const deleteMetafieldInputs = {
  shopifyConnection,
  key: input({
    ...key,
    comments: "Provide the key of the metafield to delete.",
  }),
  ownerId: input({
    ...ownerId,
    comments: "Provide the owner ID of the metafield to delete.",
  }),
  namespace: input({
    ...namespace,
    comments: "Provide the namespace of the metafield to delete.",
    required: true,
    clean: util.types.toString,
  }),
};

export const countDraftOrdersInputs = {
  shopifyConnection,
};

export const pollingTriggerInputs = {
  shopifyConnection,
};
