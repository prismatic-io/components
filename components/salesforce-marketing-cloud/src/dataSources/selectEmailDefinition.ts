import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { EMAIL_DEFINITIONS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectEmailDefinition = dataSource({
  display: {
    label: "Select Email Definition",
    description:
      "Select a transactional email definition from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(
      client,
      EMAIL_DEFINITIONS_PATH,
      true,
      { $pageSize: 500 },
      { itemsField: "definitions", preserveFields: ["requestId"] },
    );

    const definitions = (response as PaginatedResponse).definitions ?? [];

    const result = definitions
      .map<Element>((item) => ({
        label: util.types.toString(item.name),
        key: util.types.toString(item.definitionKey),
      }))
      .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Welcome Email", key: "welcome-email-def" },
      { label: "Order Confirmation", key: "order-confirmation-def" },
    ],
  },
});
