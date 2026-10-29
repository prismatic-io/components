import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  policyId,
  policyIDList,
  categories,
  tags,
  reportFields,
} from "../../inputs";
import { createClient } from "../../client";
import { generatePayload } from "../../util";

export const updatePolicy = action({
  display: {
    description: "manage categories, tags and report fields on a policy.",
    label: "Update Policy",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "policy",
      comments: "Specifies to the job that it has to update a policy.",
    },
    policyId,
    policyIDList: {
      ...policyIDList,
      required: false,
    },
    categories,
    tags,
    reportFields,
  },
  perform: async (
    context,
    {
      connectionInput,
      type,
      categories,
      policyIDList,
      policyId,
      reportFields,
      tags,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "update",
      inputSettings: {
        type: type || undefined,
        policyID: policyId || undefined,
        policyIDList: policyIDList || undefined,
      },
      categories: categories || undefined,
      tags: tags || undefined,
      reportFields: reportFields || undefined,
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
