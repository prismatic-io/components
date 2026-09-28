import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { ENDPOINTS } from "../constants";
import { productOptionTypesExamplePayload } from "../examplePayloads";
import { productOptionTypesInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const productOptionTypes = dataSource({
  display: {
    label: "Product Option Types",
    description: "Get custom option types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<
      {
        code: string;
        label: string;
        group: string;
        extension_attributes: object;
      }[]
    >(ENDPOINTS.productOptionTypes);
    return {
      result: toSortedElements(data, ({ code, label }) => ({
        label,
        key: code,
      })),
    };
  },
  inputs: productOptionTypesInputs,
  dataSourceType: "picklist",
  examplePayload: productOptionTypesExamplePayload,
});
