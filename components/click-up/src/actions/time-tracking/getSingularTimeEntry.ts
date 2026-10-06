import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getSingularTimeEntryExamplePayload } from "../../examplePayloads";
import { getSingularTimeEntryInputs } from "../../inputs";
import { getSingularTimeEntryOutputSchema } from "../../outputSchemas";
import type { SingularTimeEntryQueryParams } from "../../types";
import { addToObjectIfContent, booleanToString } from "../../util";
export const getSingularTimeEntry = action({
  display: {
    label: "Get Time Entry",
    description: "Retrieve a single time entry.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSingularTimeEntryOutputSchema,
  }),
  examplePayload: getSingularTimeEntryExamplePayload,
  performSafety: "safe",
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      timerId,
      includeTaskTags,
      includeLocationNames,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const queryParams: SingularTimeEntryQueryParams = addToObjectIfContent({
      include_task_tags: booleanToString(includeTaskTags),
      include_location_names: booleanToString(includeLocationNames),
    });
    const { data } = await client.get(
      `/team/${teamId}/time_entries/${timerId}`,
      {
        params: queryParams,
      },
    );
    return {
      data,
    };
  },
  inputs: getSingularTimeEntryInputs,
});
