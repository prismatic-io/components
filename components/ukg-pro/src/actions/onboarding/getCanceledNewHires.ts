import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCanceledNewHiresExamplePayload } from "../../examplePayloads";
import { getCanceledNewHiresInputs } from "../../inputs";
import type { CanceledNewHire } from "../../types";
import { fetchWithPagination, getTenantIdentifier } from "../../util";







export const getCanceledNewHires = action({
  display: {
    label: "Get Canceled New Hires",
    description: "Retrieve a list of new hires with canceled onboarding status.",
  },
  inputs: getCanceledNewHiresInputs,
  perform: async (context, { connection, fetchAll, page, perPage, filterParameters }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await fetchWithPagination<CanceledNewHire>(
      client,
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/canceled`,
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getCanceledNewHiresExamplePayload,
});
