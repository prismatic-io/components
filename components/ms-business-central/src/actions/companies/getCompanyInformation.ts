import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getCompanyInformationExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { connectionInput } from "../../inputs/general";
import type { CompanyInformation } from "../../interfaces";

export const getCompanyInformation = action({
  display: {
    label: "Get Company Information",
    description: "Get information about a company in your Business Central organization.",
  },
  perform: async (context, { companyId, connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.get<CompanyInformation>(
      `/companies(${companyId})/companyInformation`,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
  },
  examplePayload: getCompanyInformationExamplePayload,
});
