import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getSamlIdpMetadataExamplePayload } from "../../examplePayloads";
import { getSamlIdpMetadataInputs } from "../../inputs";

const getSamlIdpMetadata = action({
  display: {
    label: "Get Saml Idp Metadata (V1)",
    description: "GET SAML Metadata.",
  },
  inputs: getSamlIdpMetadataInputs,
  examplePayload: getSamlIdpMetadataExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get("/saml/idp_metadata");
    return { data };
  },
});

export default {
  getSamlIdpMetadata,
};
