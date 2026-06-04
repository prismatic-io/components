import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Retrieves a list of customers based on specified criteria.",
  },
  perform: async (context, { connectionInput, ...params }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const queryParameters = {
      stateCode: params.stateCode || undefined,
      countryCode: params.countryCode || undefined,
      marketplaceId: params.marketplaceId || undefined,
      tagId: params.tagId || undefined,
      sortBy: params.sortBy || undefined,
      sortDir: params.sortDir || undefined,
      page: params.page || undefined,
      pageSize: params.pageSize || undefined,
    };

    const { data } = await client.get("/customers", {
      params: queryParameters,
    });
    return { data };
  },
  inputs: listCustomersInputs,
  examplePayload: listCustomersExamplePayload,
});
