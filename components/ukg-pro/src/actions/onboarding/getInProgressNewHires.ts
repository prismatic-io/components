import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getInProgressNewHiresExamplePayload } from "../../examplePayloads";
import { getInProgressNewHiresInputs } from "../../inputs";
import type { InProgressNewHire } from "../../types";
import { fetchWithPagination, getTenantIdentifier } from "../../util";







export const getInProgressNewHires = action({
  display: {
    label: "Get In Progress New Hires",
    description: "Retrieve a list of new hires currently going through onboarding.",
  },
  inputs: getInProgressNewHiresInputs,
  perform: async (context, { connection, page, perPage, fetchAll, filterParameters }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await fetchWithPagination<InProgressNewHire>(
      client,
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/in-progress`,
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getInProgressNewHiresExamplePayload,
});
