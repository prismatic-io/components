import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { connectionInput } from "../inputs";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "A picklist of orders in your Adobe Commerce store.",
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
            entity_id: number;
            increment_id: string;
            grand_total: number;
            status: string;
          }[];
        };
      }>("/orders", {
        params: {
          "searchCriteria[pageSize]": "100",
        },
      });

      return {
        result: (items || [])
          .map<Element>((item) => ({
            label: `#${item.increment_id} - ${item.status} ($${item.grand_total})`,
            key: item.entity_id.toString(),
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
        label: "#000000001 - pending ($49.99)",
        key: "1",
      },
    ],
  },
});
