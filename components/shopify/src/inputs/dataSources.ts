import { connectionInput, orderId, productId } from "./common";

export const selectCollectionsInputs = {
  shopifyConnection: connectionInput,
};

export const selectCustomersInputs = {
  shopifyConnection: connectionInput,
};

export const selectDraftOrdersInputs = {
  shopifyConnection: connectionInput,
};

export const selectFulfillmentOrdersInputs = {
  shopifyConnection: connectionInput,
  orderId: {
    ...orderId,
    dataSource: undefined,
  },
};

export const selectFulfillmentServicesInputs = {
  shopifyConnection: connectionInput,
};

export const selectFulfillmentsInputs = {
  shopifyConnection: connectionInput,
  orderId: {
    ...orderId,
    dataSource: undefined,
  },
};

export const selectInventoryItemsInputs = {
  shopifyConnection: connectionInput,
};

export const selectLocationsInputs = {
  shopifyConnection: connectionInput,
};

export const selectOrdersInputs = {
  shopifyConnection: connectionInput,
};

export const selectProductImagesInputs = {
  shopifyConnection: connectionInput,
  productId: {
    ...productId,
    dataSource: undefined,
  },
};

export const selectProductsInputs = {
  shopifyConnection: connectionInput,
};

export const selectVariantsInputs = {
  shopifyConnection: connectionInput,
  productId: {
    ...productId,
    dataSource: undefined,
  },
};
