import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { SMS_DEFINITIONS_PATH } from "../constants";
import { connection } from "../inputs/common";
import type { PaginatedResponse } from "../types";
import { paginateResults } from "../util/pagination";

export const selectSmsDefinition = dataSource({
  display: {
    label: "Select SMS Definition",
    description: "Select a transactional SMS definition from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults(
      client,
      SMS_DEFINITIONS_PATH,
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
      { label: "Order Confirmation SMS", key: "order-confirmation-sms" },
      { label: "Verification Code", key: "verification-code-sms" },
    ],
  },
});
