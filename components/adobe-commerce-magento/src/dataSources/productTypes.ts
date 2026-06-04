import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const productTypes = dataSource({
  display: {
    label: "Product Types",
    description: "Retrieve available product types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    try {
      const {
        data: { data },
      } = await client.get<{
        data: {
          name: string;
          label: string;
          extension_atributes: object;
        }[];
      }>("/products/types");
      const result = data.map<Element>(({ name, label }) => ({
        label: name,
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
