import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const productAttributeTypes = dataSource({
  display: {
    label: "Product Attribute Types",
    description: "Retrieve list of product attribute types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    try {
      const {
        data: { data },
      } = await client.get<{
        data: { value: string; label: string; extension_atributes: object }[];
      }>("/products/attributes/types");
      const result = data.map<Element>(({ value, label }) => ({
        label: value,
        key: label,
      }));
      return { result };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
  },
  dataSourceType: "picklist",
});
