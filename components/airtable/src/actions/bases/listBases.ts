import { action } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { listBasesExamplePayload } from "../../examplePayloads";
import { listBasesInputs } from "../../inputs";
import type { AirtableBase } from "../../types";
import { paginateData } from "../../util";

export const listBases = action({
  display: {
    label: "List Bases",
    description: "List all bases within the Airtable account.",
  },
  inputs: listBasesInputs,
  perform: async (context, params) => {
    const client = createAirtableClient(
      params.airtableConnection,
      context.debug.enabled,
    );
    const data = await paginateData<AirtableBase>(
      client,
      "/v0/meta/bases",
      "bases",
      {},
      true,
    );
    return { data };
  },
  examplePayload: listBasesExamplePayload,
});
