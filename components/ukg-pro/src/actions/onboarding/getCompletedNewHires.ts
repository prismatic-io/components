import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCompletedNewHiresExamplePayload } from "../../examplePayloads";
import { getCompletedNewHiresInputs } from "../../inputs";
import type { CompletedNewHire } from "../../types";
import { fetchWithPagination, getTenantIdentifier } from "../../util";







export const getCompletedNewHires = action({
  display: {
    label: "Get Completed New Hires",
    description: "Retrieve a list of new hires with completed onboarding status.",
  },
  inputs: getCompletedNewHiresInputs,
  perform: async (context, { connection, page, perPage, fetchAll, filterParameters }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await fetchWithPagination<CompletedNewHire>(
      client,
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/completed`,
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getCompletedNewHiresExamplePayload,
});
