import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  userEmail,
  policyIDList,
  fields,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";
import { getPolicyExamplePayload } from "../../examplePayloads";

export const getPolicy = action({
  display: {
    description: "Gets specific information about listed policies.",
    label: "Get Policy",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "policy",
      comments:
        "Specifies to the job that it has to get information specific to policies.",
    },
    policyIDList,
    fields,
    userEmail,
  },
  perform: async (
    context,
    { connectionInput, fields, policyIDList, type, userEmail },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type: type || undefined,
        fields: fields || undefined,
        policyIDList: policyIDList || undefined,
        userEmail: userEmail || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: getPolicyExamplePayload,
  },
});
