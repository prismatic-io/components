import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  events,
  project_id,
  region,
  useProjectToken,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { importEventsExamplePayload } from "../../examplePayloads";

export const importEvents = action({
  display: {
    label: "Import Events",
    description: "Each request ingests a batch of events into Mixpanel.",
  },
  inputs: {
    connection: connectionInput,
    useProjectToken,
    region,
    events,
    project_id,
  },
  perform: async (
    context,
    { connection, region, events, project_id, useProjectToken },
  ) => {
    const client = createClient(
      region,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post("/import", events, {
      params: { project_id: project_id || undefined },
    });
    return {
      data,
    };
  },
  examplePayload: importEventsExamplePayload,
});
