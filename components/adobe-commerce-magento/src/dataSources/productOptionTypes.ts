import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const productOptionTypes = dataSource({
  display: {
    label: "Product Option Types",
    description: "Get custom option types.",
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    try {
      const {
        data: { data },
      } = await client.get<{
        data: {
          code: string;
          label: string;
          group: string;
          extension_atributes: object;
        }[];
      }>("/products/options/types");
      const result = data.map<Element>(({ code, label }) => ({
        label: code,
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
