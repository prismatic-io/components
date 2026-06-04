import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { compositeRequestInputs } from "../../inputs";
import { compositeRequestExamplePayload } from "../../examplePayloads";

export const compositeRequests = action({
  display: {
    label: "Send Composite Request",
    description: "Send multiple requests in a single HTTP call.",
  },
  inputs: compositeRequestInputs,
  perform: async (
    context,
    { version, connection, allOrNone, collateSubrequests, compositeRequest },
  ) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.post("/composite", {
      allOrNone,
      collateSubrequests,
      compositeRequest,
    });
    return {
      data,
    };
  },
  examplePayload: compositeRequestExamplePayload,
});
