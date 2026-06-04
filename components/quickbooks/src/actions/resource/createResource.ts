import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  connectionInput,
  resourceAttributes,
  resourceType,
} from "../../inputs";

export const createResource = action({
  display: {
    label: "Create Resource",
    description: "Create a new resource in QuickBooks.",
  },
  perform: async (
    context,
    { resourceAttributes, resourceType, quickbooksConnection },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/${resourceType.toLowerCase()}/`,
      resourceAttributes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    resourceAttributes,
    resourceType,
  },
});
