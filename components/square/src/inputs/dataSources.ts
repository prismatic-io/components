import { catalogVersion, types } from "./catalog";
import { cursor, limit, location_id, sortField, sortOrder, squareConnection } from "./common";

export const selectLocationsInputs = {
  squareConnection,
};

export const selectMerchantsInputs = {
  squareConnection,
};

export const selectBankAccountsInputs = {
  squareConnection,
  cursor,
  limit,
  location_id,
};

export const selectCatalogInputs = {
  squareConnection,
  cursor,
  types,
  catalogVersion,
};

export const selectCustomersInputs = {
  squareConnection,
  cursor,
  limit,
  sortField,
  sortOrder,
};

export const selectWebhookEventTypesInputs = {
  squareConnection,
};

export const selectInvoiceInputs = {
  squareConnection,
};

export const selectJobInputs = {
  squareConnection,
};

export const selectOrderInputs = {
  squareConnection,
};

export const selectPaymentInputs = {
  squareConnection,
};

export const selectRefundInputs = {
  squareConnection,
};

export const selectTeamMemberInputs = {
  squareConnection,
};

export const selectWebhookSubscriptionInputs = {
  squareConnection,
};
