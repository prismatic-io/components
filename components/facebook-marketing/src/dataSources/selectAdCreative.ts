import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectAdCreativeResponse } from "../examplePayloads";
import { selectAdCreativeInputs } from "../inputs";
import { getPaginatedData } from "../util";
export const selectAdCreative = dataSource({
  display: {
    label: "Select Ad Creative",
    description: "Select an ad creative in the provided ad account.",
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(
      client,
      `/${params.adAccountId}/adcreatives`,
      true,
      {
        fields: "name,id",
      },
    );
    const result: Element[] = data
      .map((creative: { name: string; id: string }) => ({
        label: `${creative.name} - (${creative.id})`,
        key: creative.id.toString(),
      }))
      .sort((a: Element, b: Element) =>
        (a.label || "") < (b.label || "") ? -1 : 1,
      );
    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: selectAdCreativeInputs,
  examplePayload: selectAdCreativeResponse,
});
