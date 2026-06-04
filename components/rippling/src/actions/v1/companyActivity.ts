import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getCompanyActivityExamplePayload } from "../../examplePayloads";
import { getCompanyActivityInputs } from "../../inputs";
import { paginateV1CompanyActivity } from "../../utils/pagination";

const getCompanyActivity = action({
  display: {
    label: "Get Company Activity (V1)",
    description: "GET Company Activity.",
  },
  inputs: getCompanyActivityInputs,
  examplePayload: getCompanyActivityExamplePayload,
  perform: async (
    context,
    { connection, fetchAll, startDate, endDate, next, limit },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1CompanyActivity(client, "/company_activity", fetchAll, {
      startDate,
      endDate,
      next,
      limit,
    });
  },
});

export default {
  getCompanyActivity,
};
