import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "A picklist of customers in your Adobe Commerce store.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = await getClient(connectionInput, false);
    try {
      const {
        data: {
          data: { items },
        },
      } = await client.get<{
        data: {
          items: {
            id: number;
            firstname: string;
            lastname: string;
            email: string;
          }[];
        };
      }>("/customers/search", {
        params: {
          "searchCriteria[pageSize]": "100",
        },
      });

      return {
        result: (items || [])
          .map<Element>((item) => ({
            label: `${item.firstname} ${item.lastname} (${item.email})`,
            key: item.id.toString(),
          }))
          .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "John Doe (john@example.com)",
        key: "1",
      },
    ],
  },
});
