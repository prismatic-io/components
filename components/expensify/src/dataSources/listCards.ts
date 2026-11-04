import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listCardsDataSourceExamplePayload } from "../examplePayloads";
import { listCardsDataSourceInputs } from "../inputs";
import type { CardsResponse } from "../types";
import { generatePayload } from "../util";

export const listCards = dataSource({
  display: {
    label: "List Cards",
    description: "Returns all Cards.",
  },
  inputs: listCardsDataSourceInputs,
  perform: async (_context, { connectionInput, domain, type }) => {
    const client = createClient(connectionInput, false);
    const json = {
      inputSettings: {
        type,
        domain,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post<CardsResponse>("", generatedJson);

    if (data?.domainCardList?.length > 0) {
      const { domainCardList } = data;
      const result = domainCardList.map<Element>(({ cardName, cardID }) => ({
        label: cardName,
        key: cardID,
      }));
      return {
        result,
      };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: listCardsDataSourceExamplePayload,
});
