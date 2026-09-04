import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { openViewExamplePayload as updateViewResponse } from "../../examplePayloads";
import { updateViewInputs } from "../../inputs";
import { debugLogger } from "../../util";
export const updateView = action({
  display: {
    label: "Update View",
    description: "Update an existing view.",
  },
  inputs: updateViewInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, view_id, external_id, view },
  ) => {
    debugLogger({ debug, connection, view_id, external_id, view });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.views.update({
      view_id: view_id || undefined,
      external_id: external_id || undefined,
      view,
    });
    return { data };
  },
  examplePerform: async (
    _context,
    { view_id, external_id, view },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateViewResponse,
      view: {
        ...updateViewResponse.view,
        ...view,
        ...(view_id ? { id: view_id } : {}),
        ...(external_id ? { external_id } : {}),
      },
    },
  }),
  examplePayload: {
    data: updateViewResponse as unknown,
  },
});
