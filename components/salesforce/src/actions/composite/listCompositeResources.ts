import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { listCompositeResourcesInputs } from "../../inputs";
import { listCompositeResourcesExamplePayload } from "../../examplePayloads";

export const listCompositeResources = action({
  display: {
    label: "List Composite Resources",
    description: "Retrieve a list of URIs for available composite resources.",
  },
  inputs: listCompositeResourcesInputs,
  perform: async (context, { version, connection }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.get("/composite");
    return {
      data,
    };
  },
  examplePayload: listCompositeResourcesExamplePayload,
});
