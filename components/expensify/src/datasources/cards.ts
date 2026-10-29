import { type Element, dataSource } from "@prismatic-io/spectral";
import { connectionInput, domain, type } from "../inputs";
import { createClient } from "../client";
import { generatePayload } from "../util";
import type { Cards } from "../interfaces";

export const listCards = dataSource({
  display: {
    label: "List Cards",
    description: "Returns all Cards.",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "domainCardList",
      comments:
        "Specifies to the job that it has to list the Cards of a domain.",
    },
    domain: {
      ...domain,
      default: "domain",
      comments:
        "Specifies to the job that it has to list the Cards of a domain.",
    },
  },
  perform: async (context, { connectionInput, domain, type }) => {
    const client = createClient(connectionInput, false);
    const json = {
      inputSettings: {
        type: type || undefined,
        domain: domain || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post<Cards>("", generatedJson);

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
});
