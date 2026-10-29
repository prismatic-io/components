import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { hubspotPaths } from "../constants";
import { selectLineItemExamplePayload } from "../examplePayloads";
import { selectLineItemInputs } from "../inputs";
import type { LineItem } from "../types";
import { getAllPaginatedData } from "../util";

export const selectLineItem = dataSource({
  display: {
    label: "Select Line Item",
    description: "Select a line item from the list of line items.",
  },
  inputs: selectLineItemInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const lineItems = (await getAllPaginatedData<LineItem>(
      client,
      hubspotPaths.objects("line_items"),
      true,
      true,
      {
        params: {
          properties: "name,hs_sku",
          archived: false,
        },
      },
    )) as LineItem[];

    const result = lineItems.map<Element>((lineItem) => ({
      label: `${lineItem.properties.name} (SKU: ${lineItem.properties.hs_sku})`,
      key: util.types.toString(lineItem.id),
    }));
    return { result };
  },
  examplePayload: selectLineItemExamplePayload,
  dataSourceType: "picklist",
});
