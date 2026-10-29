import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { listCompaniesInputs } from "../../inputs";

import type { DiscoveryResponse } from "../../types";

export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Lists all companies the authenticated user can access.",
  },
  inputs: listCompaniesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<DiscoveryResponse>("/discovery/me");
    return {
      data: data.imsOrgs.flatMap((org) => org.companies),
    };
  },
  examplePayload: listCompaniesExamplePayload,
});
