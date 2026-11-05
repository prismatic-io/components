import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { SQUARE_API_VERSION } from "../constants";
import {
  selectBankAccountsInputs,
  selectCatalogInputs,
  selectCustomersInputs,
  selectLocationsInputs,
  selectMerchantsInputs,
  selectWebhookEventTypesInputs,
} from "../inputs";
import { selectInvoice } from "./selectInvoice";
import { selectJob } from "./selectJob";
import { selectOrder } from "./selectOrder";
import { selectPayment } from "./selectPayment";
import { selectRefund } from "./selectRefund";
import { selectTeamMember } from "./selectTeamMember";
import { selectWebhookSubscription } from "./selectWebhookSubscription";

export const selectLocations = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Locations",
    description: "List and select from all of the seller's locations.",
  },
  inputs: selectLocationsInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const response = await client.get("/v2/locations");

    return {
      result: response.data.locations.map((location: { id: string; name: string }) => ({
        key: location.id,
        label: location.name,
      })),
    };
  },
});

export const selectMerchants = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Merchants",
    description: "List and select from all of the seller's merchants.",
  },
  inputs: selectMerchantsInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const response = await client.get("/v2/merchants");

    return {
      result: response.data.merchants.map((merchant: { id: string; name: string }) => ({
        key: merchant.id,
        label: merchant.name,
      })),
    };
  },
});

export const selectBankAccounts = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Bank Accounts",
    description: "List and select from all of the bank accounts linked to a Square account.",
  },
  inputs: selectBankAccountsInputs,
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(params.squareConnection);

    const queryParamsObj = {
      cursor: params.cursor,
      limit: params.limit,
      location_id: params.location_id,
    };

    const response = await client.get("/v2/bank-accounts", {
      params: queryParamsObj,
    });

    return {
      result: response.data.bank_accounts.map((account: { id: string; name: string }) => ({
        key: account.id,
        label: account.name,
      })),
    };
  },
});

export const selectCatalog = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Catalog",
    description: "List and select from all of the catalog objects of the specified types.",
  },
  inputs: selectCatalogInputs,
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(params.squareConnection);

    const queryParameters = {
      cursor: params.cursor,
      types: params.types,
      catalog_version: params.catalogVersion,
    };

    const response = await client.get("/v2/catalog/list", {
      params: queryParameters,
    });

    return {
      result: response.data.objects.map((object: { id: string; name: string }) => ({
        key: object.id,
        label: object.name,
      })),
    };
  },
});

export const selectCustomers = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Customers",
    description: "List and select from all customer profiles associated with a Square account.",
  },
  inputs: selectCustomersInputs,
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(params.squareConnection);

    const queryParameters: Record<string, unknown> = {};
    if (params.cursor) queryParameters.cursor = params.cursor;
    if (params.limit) queryParameters.limit = params.limit;
    if (params.sortField) queryParameters.sort_field = params.sortField;
    if (params.sortOrder) queryParameters.sort_order = params.sortOrder;

    const response = await client.get("/v2/customers", {
      params: queryParameters,
    });

    return {
      result: response.data.customers.map((customer: { id: string; name: string }) => ({
        key: customer.id,
        label: customer.name,
      })),
    };
  },
});

export const selectWebhookEventTypes = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Webhook Event Types",
    description: "List all webhook event types that can be subscribed to.",
  },
  inputs: selectWebhookEventTypesInputs,
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(params.squareConnection);

    const response = await client.get("/v2/webhooks/event-types", {
      params: {
        api_version: SQUARE_API_VERSION,
      },
    });

    return {
      result: response.data.event_types.map((eventType: { name: string }) => ({
        key: eventType.name,
        label: eventType.name,
      })),
    };
  },
});

export default {
  selectLocations,
  selectMerchants,
  selectBankAccounts,
  selectCatalog,
  selectCustomers,
  selectWebhookEventTypes,
  selectJob,
  selectTeamMember,
  selectInvoice,
  selectOrder,
  selectPayment,
  selectRefund,
  selectWebhookSubscription,
};
