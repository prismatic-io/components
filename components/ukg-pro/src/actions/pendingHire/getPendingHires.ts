import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPendingHiresExamplePayload } from "../../examplePayloads";
import { getPendingHiresInputs } from "../../inputs";







export const getPendingHires = action({
  display: {
    label: "Get Pending Hires",
    description: "Retrieve a list of pending hire records awaiting conversion to employees.",
  },
  inputs: getPendingHiresInputs,
  perform: async (context, { connection, companyId, page, perPage }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get("/personnel/v1/pending-hires", {
      params: { company: companyId, page, per_page: perPage },
    });

    return { data };
  },
  examplePayload: getPendingHiresExamplePayload,
});
