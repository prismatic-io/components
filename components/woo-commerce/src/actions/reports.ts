import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { handleErrors } from "../errors";
import {
  after,
  before,
  connectionInput,
  fetchAll,
  maxDate,
  minDate,
  offset,
  page,
  params,
  period,
  resultsPerPage,
  search,
} from "../inputs";
import { paginateRecords } from "../util";

export const listReports = action({
  display: {
    label: "List Reports",
    description: "Returns a list of all reports",
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    after,
    before,
    page,
    resultsPerPage,
    offset,
    search,
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
      "/reports",
      {
        per_page: resultsPerPage,
        page,
        offset,
        after,
        before,
        search,
        ...params,
      },
      fetchAll,
    );
    return {
      data: paginatedData,
    };
  },
});

export const getSalesReport = action({
  display: {
    label: "Get Sales Report",
    description: "Returns the information and metadata of a Sales Report",
  },
  inputs: {
    connection: connectionInput,
    period,
    minDate,
    maxDate,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.get(`/reports/sales`, {
          params: {
            period: util.types.toString(params.period) || undefined,
            date_min: util.types.toString(params.minDate) || undefined,
            date_max: util.types.toString(params.maxDate) || undefined,
          },
        }),
      ),
    };
  },
});

export const getTopSellersReport = action({
  display: {
    label: "Get Top Sellers Report",
    description: "Returns the information and metadata of a Sales Report",
  },
  inputs: {
    connection: connectionInput,
    period,
    minDate,
    maxDate,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(
        client.get(`/reports/top_sellers`, {
          params: {
            period: util.types.toString(params.period) || undefined,
            date_min: util.types.toString(params.minDate) || undefined,
            date_max: util.types.toString(params.maxDate) || undefined,
          },
        }),
      ),
    };
  },
});

export const getCouponTotalsReport = action({
  display: {
    label: "Get Coupon Totals Report",
    description:
      "Returns the information and metadata of a Coupon Totals Report",
  },
  inputs: {
    connection: connectionInput,
    period,
    minDate,
    maxDate,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/reports/coupons/totals`)),
    };
  },
});

export const getCustomerTotalsReport = action({
  display: {
    label: "Get Customer Totals Report",
    description:
      "Returns the information and metadata of a Customer Totals Report",
  },
  inputs: {
    connection: connectionInput,
    period,
    maxDate,
    minDate,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/reports/customers/totals`)),
    };
  },
});

export const getOrderTotalsReport = action({
  display: {
    label: "Get Order Totals Report",
    description:
      "Returns the information and metadata of a Order Totals Report",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/reports/orders/totals`)),
    };
  },
});

export const getProductTotalsReport = action({
  display: {
    label: "Get Product Totals Report",
    description:
      "Returns the information and metadata of a Product Totals Report",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/reports/products/totals`)),
    };
  },
});

export const getReviewTotalsReport = action({
  display: {
    label: "Get Review Totals Report",
    description:
      "Returns the information and metadata of a Review Totals Report",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = getClient(params.connection, debug);
    return {
      data: await handleErrors(client.get(`/reports/reviews/totals`)),
    };
  },
});
