import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import {
  after,
  before,
  connectionInput,
  fetchAll,
  lineItems,
  offset,
  orderId,
  page,
  params,
  refundAmount,
  refundId,
  resultsPerPage,
  search,
} from "../inputs";
import { paginateRecords } from "../util";

export const listRefunds = action({
  display: {
    label: "List Refunds",
    description: "Returns a list of all refunds on an existing order",
  },
  inputs: {
    connection: connectionInput,
    orderId,
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
      `/orders/${orderId}/refunds`,
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
});

export const getRefund = action({
  display: {
    label: "Get Refund",
    description: "Returns the information and metadata of a refund",
  },
  inputs: {
    connection: connectionInput,
    orderId,
    refundId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.get(`/orders/${params.orderId}/refunds/${params.refundId}`),
      ),
    };
  },
});

export const deleteRefund = action({
  display: {
    label: "Delete Refund",
    description: "Delete the information and metadata of a refund",
  },
  inputs: {
    connection: connectionInput,
    orderId,
    refundId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.delete(`/orders/${params.orderId}/refunds/${params.refundId}`, {
          params: { force: "true" },
        }),
      ),
    };
  },
});

export const createRefund = action({
  display: {
    label: "Create Refund",
    description: "Create a refund on an existing order",
  },
  inputs: {
    connection: connectionInput,
    orderId,
    refundAmount,
    lineItems: {
      ...lineItems,
      example: `[
  {
    "id": "111",
    "refund_total": 10,
    "refund_tax": [
      {
        "id": "222",
        "refund_total": 20
      }
    ]
  }
]`,
    },
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.post(`/orders/${params.orderId}/refunds`, {
          amount: util.types.toString(params.refundAmount),
          line_items: util.types.toString(params.lineItems)
            ? JSON.parse(util.types.toString(params.lineItems))
            : undefined,
        }),
      ),
    };
  },
});
