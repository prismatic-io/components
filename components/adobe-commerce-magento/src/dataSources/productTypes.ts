import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { ENDPOINTS } from "../constants";
import { productTypesExamplePayload } from "../examplePayloads";
import { productTypesInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const productTypes = dataSource({
  display: {
    label: "Product Types",
    description: "Retrieve available product types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<
      {
        name: string;
        label: string;
        extension_attributes: object;
      }[]
    >(ENDPOINTS.productTypes);
    return {
      result: toSortedElements(data, ({ name, label }) => ({
        label,
        key: name,
      })),
    };
  },
  inputs: productTypesInputs,
  dataSourceType: "picklist",
  examplePayload: productTypesExamplePayload,
});
