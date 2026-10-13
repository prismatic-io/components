import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getSiteAndCompanyInformationPayload } from "../../examplePayloads";
import { connection } from "../../inputs/general";
export const getSiteAndCompanyInformation = action({
  display: {
    label: "Get Site and Company Information",
    description:
      "Get Site and Company ID's information for all sites the authenticated user has access to.",
  },
  perform: async (context, { connection }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get("/sites");
    return {
      data,
    };
  },
  inputs: {
    connection,
  },
  examplePayload: getSiteAndCompanyInformationPayload,
});
