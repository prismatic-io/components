import { action, util } from "@prismatic-io/spectral";
import { getSageClient } from "../client";
import { connection, itemsPerPage, page } from "../inputs";

export const listCountries = action({
  display: {
    label: "List Countries",
    description: "List all countries",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/countries", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page },
});

export const listAddressTypes = action({
  display: {
    label: "List Address Types",
    description: "List all address types",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/address_types", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page },
});

export const listCurrencies = action({
  display: {
    label: "List Currencies",
    description: "List all currencies",
  },
  perform: async (context, params) => {
    const client = getSageClient(params.connection, context.debug.enabled);

    const { data } = await client.get("/currencies", {
      params: {
        items_per_page: util.types.toInt(params.itemsPerPage) || undefined,
        page: util.types.toInt(params.page) || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: { connection, itemsPerPage, page },
});
