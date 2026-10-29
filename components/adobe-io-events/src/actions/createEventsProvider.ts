import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { createEventsProviderExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import {
  connection,
  consumerOrgId,
  description,
  docsUrl,
  label,
  projectId,
  workspaceId,
} from "../inputs";
import type { EventsProvider } from "../types/EventsProvider";

export const createEventsProvider = action({
  display: {
    label: "Create Events Provider",
    description: "Create an Adobe I/O Events Provider",
  },
  examplePayload: createEventsProviderExamplePayload,
  perform: async (
    context,
    {
      connection,
      consumerOrgId,
      projectId,
      workspaceId,
      label,
      description,
      docsUrl,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body: EventsProvider = {
      label,
    };
    if (description) body.description = description;
    if (docsUrl) body.docs_url = docsUrl;

    try {
      const { data } = await client.post(
        `/${consumerOrgId}/${projectId}/${workspaceId}/providers`,
        body,
        { headers: { "Content-Type": "application/json" } },
      );
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
  inputs: {
    connection,
    consumerOrgId,
    projectId,
    workspaceId,
    label,
    description,
    docsUrl,
  },
});
