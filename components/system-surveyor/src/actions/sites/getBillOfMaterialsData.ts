import { URLSearchParams } from "node:url";
import { action, util } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getBillOfMaterialsDataExamplePayload } from "../../examplePayloads/sites";
import { getBillOfMaterialsDataInputs } from "../../inputs";




export const getBillOfMaterialsData = action({
  display: {
    label: "Get Bill of Materials Data",
    description:
      "Retrieve bill of materials data for a specific site and surveys.",
  },
  inputs: getBillOfMaterialsDataInputs,
  perform: async (context, { ssvConnection, siteId, surveyIds }) => {
    const client = await createSsvClient(ssvConnection, context);

    
    
    const params = new URLSearchParams();
    for (const id of surveyIds as string[]) {
      params.append("surveys", id);
    }

    const surveys = util.types.toString(`?${params}`, "");

    const { data } = await client.get(`/v3/site/${siteId}/bom${surveys}`);

    return { data };
  },
  examplePayload: getBillOfMaterialsDataExamplePayload,
});
