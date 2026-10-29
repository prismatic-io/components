import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import { listOrdersExamplePayload } from "../examplePayloads";
import {
  after,
  before,
  billingAddress1,
  billingAddress2,
  city,
  connectionInput,
  country,
  email,
  fetchAll,
  firstName,
  isPaid,
  lastName,
  lineItems,
  offset,
  orderId,
  page,
  params,
  paymentMethod,
  paymentMethodTitle,
  phone,
  postalcode,
  resultsPerPage,
  search,
  shippingAddress1,
  shippingAddress2,
  shippingLines,
  state,
  values,
} from "../inputs";
import { paginateRecords } from "../util";

export const createOrder = action({
  display: {
    label: "Create Order",
    description: "Create a new order record",
  },
  inputs: {
    connection: connectionInput,
    lineItems,
    shippingLines,
    paymentMethod,
    paymentMethodTitle,
    isPaid,
    email: { ...email, required: false },
    phone,
    firstName,
    lastName,
    billingAddress1,
    billingAddress2,
    billingCity: { ...city, label: "Billing City" },
    billingState: { ...state, label: "Billing State" },
    billingPostalCode: { ...postalcode, label: "Billing Postal Code" },
    billingCountry: { ...country, label: "Billing Country" },
    shippingAddress1,
    shippingAddress2,
    shippingCity: { ...city, label: "Shipping City" },
    shippingState: { ...state, label: "Shipping State" },
    shippingCountry: { ...country, label: "Shipping Country" },
    shippingPostalCode: { ...postalcode, label: "Shipping Postal Code" },
    values,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.post(`/orders`, {
          ...util.types.keyValPairListToObject(params.values),
          payment_method:
            util.types.toString(params.paymentMethod) || undefined,
          payment_method_title:
            util.types.toString(params.paymentMethodTitle) || undefined,
          set_paid: util.types.toBool(params.isPaid),
          billing: {
            first_name: util.types.toString(params.firstName) || undefined,
            last_name: util.types.toString(params.lastName) || undefined,
            address_1: util.types.toString(params.billingAddress1) || undefined,
            address_2: util.types.toString(params.billingAddress2) || undefined,
            city: util.types.toString(params.billingCity) || undefined,
            state: util.types.toString(params.billingState) || undefined,
            postcode:
              util.types.toString(params.billingPostalCode) || undefined,
            country: util.types.toString(params.billingCountry) || undefined,
            email: util.types.toString(params.email) || undefined,
            phone: util.types.toString(params.phone) || undefined,
          },
          shipping: {
            first_name: util.types.toString(params.firstName) || undefined,
            last_name: util.types.toString(params.lastName) || undefined,
            address_1:
              util.types.toString(params.shippingAddress1) || undefined,
            address_2: util.types.toString(params.billingAddress2) || undefined,
            city: util.types.toString(params.shippingCity) || undefined,
            state: util.types.toString(params.shippingState) || undefined,
            postcode:
              util.types.toString(params.shippingPostalCode) || undefined,
            country: util.types.toString(params.shippingCountry) || undefined,
          },
          line_items: util.types.toString(params.lineItems)
            ? JSON.parse(util.types.toString(params.lineItems))
            : [],
          shipping_lines: util.types.toString(params.shippingLines)
            ? JSON.parse(util.types.toString(params.shippingLines))
            : [],
        }),
      ),
    };
  },
});

export const updateOrder = action({
  display: {
    label: "Update Order",
    description: "Update an existing order record",
  },
  inputs: {
    connection: connectionInput,
    orderId,
    lineItems,
    shippingLines,
    paymentMethod,
    paymentMethodTitle,
    isPaid,
    email: { ...email, required: false },
    phone,
    firstName,
    lastName,
    billingAddress1,
    billingAddress2,
    billingCity: { ...city, label: "Billing City" },
    billingState: { ...state, label: "Billing State" },
    billingPostalCode: { ...postalcode, label: "Billing Postal Code" },
    billingCountry: { ...country, label: "Billing Country" },
    shippingAddress1,
    shippingAddress2,
    shippingCity: { ...city, label: "Shipping City" },
    shippingState: { ...state, label: "Shipping State" },
    shippingCountry: { ...country, label: "Shipping Country" },
    shippingPostalCode: { ...postalcode, label: "Shipping Postal Code" },
    values,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.post(`/orders/${params.orderId}`, {
          ...util.types.keyValPairListToObject(params.values),
          payment_method:
            util.types.toString(params.paymentMethod) || undefined,
          payment_method_title:
            util.types.toString(params.paymentMethodTitle) || undefined,
          set_paid: util.types.toBool(params.isPaid),
          billing: {
            first_name: util.types.toString(params.firstName) || undefined,
            last_name: util.types.toString(params.lastName) || undefined,
            address_1: util.types.toString(params.billingAddress1) || undefined,
            address_2: util.types.toString(params.billingAddress2) || undefined,
            city: util.types.toString(params.billingCity) || undefined,
            state: util.types.toString(params.billingState) || undefined,
            postcode:
              util.types.toString(params.billingPostalCode) || undefined,
            country: util.types.toString(params.billingCountry) || undefined,
            email: util.types.toString(params.email) || undefined,
            phone: util.types.toString(params.phone) || undefined,
          },
          shipping: {
            first_name: util.types.toString(params.firstName) || undefined,
            last_name: util.types.toString(params.lastName) || undefined,
            address_1:
              util.types.toString(params.shippingAddress1) || undefined,
            address_2: util.types.toString(params.billingAddress2) || undefined,
            city: util.types.toString(params.shippingCity) || undefined,
            state: util.types.toString(params.shippingState) || undefined,
            postcode:
              util.types.toString(params.shippingPostalCode) || undefined,
            country: util.types.toString(params.shippingCountry) || undefined,
          },
          line_items: util.types.toString(params.lineItems)
            ? JSON.parse(util.types.toString(params.lineItems))
            : undefined,
          shipping_lines: util.types.toString(params.shippingLines)
            ? JSON.parse(util.types.toString(params.shippingLines))
            : undefined,
        }),
      ),
    };
  },
});

export const listOrders = action({
  display: {
    label: "List Orders",
    description: "Returns a list of all orders",
  },
  inputs: {
    connection: connectionInput,
    resultsPerPage,
    page,
    offset,
    search,
    before,
    after,
    params,
    fetchAll,
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      after,
      before,
      connection,
      page,
      resultsPerPage,
      offset,
      search,
      params,
      fetchAll,
    },
  ) => {
    const client = getClient(connection, debug);
    const paginatedData = await paginateRecords(
      client,
      "/orders",
      {
        per_page: resultsPerPage,
        page,
        offset,
        search,
        before,
        after,
        ...params,
      },
      fetchAll,
    );
    return {
      data: paginatedData,
    };
  },
  examplePayload: listOrdersExamplePayload,
});

export const getOrder = action({
  display: {
    label: "Get Order",
    description: "Returns the information and metadata of an order",
  },
  inputs: {
    connection: connectionInput,
    orderId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/orders/${params.orderId}`)),
    };
  },
});

export const deleteOrder = action({
  display: {
    label: "Delete Order",
    description: "Delete the information and metadata of an order",
  },
  inputs: {
    connection: connectionInput,
    orderId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.delete(`/orders/${params.orderId}`)),
    };
  },
});
