import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { ENDPOINTS } from "../constants";
import { productAttributeTypesExamplePayload } from "../examplePayloads";
import { productAttributeTypesInputs } from "../inputs";
import { toSortedElements } from "../utils";
export const productAttributeTypes = dataSource({
  display: {
    label: "Product Attribute Types",
    description: "Retrieve list of product attribute types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    const { data } = await client.get<
      {
        value: string;
        label: string;
        extension_attributes: object;
      }[]
    >(ENDPOINTS.productAttributeTypes);
    return {
      result: toSortedElements(data, ({ value, label }) => ({
        label,
        key: value,
      })),
    };
  },
  inputs: productAttributeTypesInputs,
  dataSourceType: "picklist",
  examplePayload: productAttributeTypesExamplePayload,
});
