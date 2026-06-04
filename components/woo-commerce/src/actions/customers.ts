import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import { listCustomersExamplePayload } from "../examplePayloads";
import {
  after,
  before,
  billingAddress1,
  billingAddress2,
  city,
  company,
  connectionInput,
  country,
  customerId,
  email,
  fetchAll,
  firstName,
  lastName,
  offset,
  page,
  params,
  phone,
  postalcode,
  resultsPerPage,
  search,
  shippingAddress1,
  shippingAddress2,
  state,
  username,
  values,
} from "../inputs";
import { paginateRecords } from "../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Returns a list of all active customers",
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    resultsPerPage,
    page,
    offset,
    search,
    before,
    after,
    params,
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
      "/customers",
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
  examplePayload: listCustomersExamplePayload,
});

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Returns the information and metadata of the given user",
  },
  inputs: {
    connection: connectionInput,
    customerId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/customers/${params.customerId}`)),
    };
  },
});

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete the information and metadata of the given user",
  },
  inputs: {
    connection: connectionInput,
    customerId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.delete(`/customers/${params.customerId}`),
      ),
    };
  },
});

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer record",
  },
  inputs: {
    connection: connectionInput,
    email,
    phone,
    username,
    firstName,
    lastName,
    company,
    billingAddress1,
    billingAddress2,
    city,
    state,
    country,
    postalcode,
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

    const request = {
      ...util.types.keyValPairListToObject(params.values),
      email: util.types.toString(params.email) || undefined,
      first_name: util.types.toString(params.firstName) || undefined,
      last_name: util.types.toString(params.lastName) || undefined,
      username: util.types.toString(params.username) || undefined,
      billing: {
        first_name: util.types.toString(params.firstName) || undefined,
        last_name: util.types.toString(params.lastName) || undefined,
        company: util.types.toString(params.company) || undefined,
        address_1: util.types.toString(params.billingAddress1) || undefined,
        address_2: util.types.toString(params.billingAddress2) || undefined,
        city: util.types.toString(params.city) || undefined,
        state: util.types.toString(params.state) || undefined,
        postcode: util.types.toString(params.postalcode) || undefined,
        country: util.types.toString(params.country) || undefined,
        email: util.types.toString(params.email) || undefined,
        phone: util.types.toString(params.phone) || undefined,
      },
      shipping: {
        first_name: util.types.toString(params.firstName) || undefined,
        last_name: util.types.toString(params.lastName) || undefined,
        company: util.types.toString(params.company) || undefined,
        address_1: util.types.toString(params.shippingAddress1) || undefined,
        address_2: util.types.toString(params.billingAddress2) || undefined,
        city: util.types.toString(params.shippingCity) || undefined,
        state: util.types.toString(params.shippingState) || undefined,
        postcode: util.types.toString(params.shippingPostalCode) || undefined,
        country: util.types.toString(params.shippingCountry) || undefined,
      },
    };

    return {
      data: await handleErrors(client.post(`/customers`, request)),
    };
  },
});

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update an existing customer record",
  },
  inputs: {
    connection: connectionInput,
    customerId,
    email: { ...email, required: false },
    phone,
    username,
    firstName,
    lastName,
    company,
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
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);

    const request = {
      email: util.types.toString(params.email) || undefined,
      first_name: util.types.toString(params.firstName) || undefined,
      last_name: util.types.toString(params.lastName) || undefined,
      username: util.types.toString(params.username) || undefined,
      billing: {
        first_name: util.types.toString(params.firstName) || undefined,
        last_name: util.types.toString(params.lastName) || undefined,
        company: util.types.toString(params.company) || undefined,
        address_1: util.types.toString(params.billingAddress1) || undefined,
        address_2: util.types.toString(params.billingAddress2) || undefined,
        city: util.types.toString(params.billingCity) || undefined,
        state: util.types.toString(params.billingState) || undefined,
        postcode: util.types.toString(params.billingPostalCode) || undefined,
        country: util.types.toString(params.billingCountry) || undefined,
        email: util.types.toString(params.email) || undefined,
        phone: util.types.toString(params.phone) || undefined,
      },
      shipping: {
        first_name: util.types.toString(params.firstName) || undefined,
        last_name: util.types.toString(params.lastName) || undefined,
        company: util.types.toString(params.company) || undefined,
        address_1: util.types.toString(params.shippingAddress1) || undefined,
        address_2: util.types.toString(params.billingAddress2) || undefined,
        city: util.types.toString(params.shippingCity) || undefined,
        state: util.types.toString(params.shippingState) || undefined,
        postcode: util.types.toString(params.shippingPostalCode) || undefined,
        country: util.types.toString(params.shippingCountry) || undefined,
      },
    };

    return {
      data: await handleErrors(
        client.put(`/customers/${params.customerId}`, request),
      ),
    };
  },
});
