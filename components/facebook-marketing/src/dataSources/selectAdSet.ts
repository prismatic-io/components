import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectAdSetResponse } from "../examplePayloads";
import { selectAdSetInputs } from "../inputs";
import { getPaginatedData } from "../util";
export const selectAdSet = dataSource({
  display: {
    label: "Select Ad Set",
    description: "Select an ad set in the provided ad account.",
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(client, `/${params.adAccountId}/adsets`, true, {
      fields: "name,id",
    });
    const result: Element[] = data
      .map((adSet: { name: string; id: string }) => ({
        label: `${adSet.name} - (${adSet.id})`,
        key: adSet.id.toString(),
      }))
      .sort((a: Element, b: Element) =>
        (a.label || "") < (b.label || "") ? -1 : 1,
      );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: selectAdSetInputs,
  examplePayload: selectAdSetResponse,
});
