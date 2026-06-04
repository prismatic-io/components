import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getCompaniesExamplePayload } from "../../examplePayloads";
import { getCompaniesInputs } from "../../inputs";

const getCompanies = action({
  display: {
    label: "Get Companies (V1)",
    description: "GET Current Company.",
  },
  inputs: getCompaniesInputs,
  examplePayload: getCompaniesExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get("/companies/current");
    return { data };
  },
});

export default {
  getCompanies,
};
