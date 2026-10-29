import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { getCompanyInfoPayload as examplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import { getRealmId } from "../../util";

export const getCompanyInfo = action({
  display: {
    label: "Get Company Info",
    description: "Retrieve information about the company.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const realmId = getRealmId(params.quickbooksConnection);

    const {
      data: { CompanyInfo },
    } = await client.get(`/companyinfo/${realmId}`);
    return { data: CompanyInfo };
  },
  inputs: { quickbooksConnection: connectionInput },

  examplePayload,
});
