import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { updateEventsProviderExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import {
  connection,
  consumerOrgId,
  description,
  docsUrl,
  label,
  projectId,
  providerId,
  workspaceId,
} from "../inputs";
import type { EventsProvider } from "../types/EventsProvider";

export const updateEventsProvider = action({
  display: {
    label: "Update Events Provider",
    description: "Update an Adobe I/O Events Provider",
  },
  examplePayload: updateEventsProviderExamplePayload,
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
      providerId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body: EventsProvider = {
      label,
    };
    if (description) body.description = description;
    if (docsUrl) body.docs_url = docsUrl;

    try {
      const { data } = await client.put(
        `/${consumerOrgId}/${projectId}/${workspaceId}/providers/${providerId}`,
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
    providerId,
  },
});
