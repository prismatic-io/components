import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection } from "../../inputs/general";
import { getSiteAndCompanyInformationPayload } from "../../examplePayloads";

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
