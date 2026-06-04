import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProjectExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  date,
  limit_total_hours,
  max_limit_total_hours,
  project_code,
  project_id,
  project_name,
} from "../../inputs";

export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Update a project.",
  },
  inputs: {
    connectionInput,
    id: project_id,
    name: project_name,
    code: project_code,
    start_date: { ...date, label: "Start Date" },
    end_date: { ...date, label: "End Date" },
    limit_total_hours,
    max_limit_total_hours,
  },
  perform: async (
    context,
    {
      connectionInput,
      id,
      name,
      code,
      start_date,
      end_date,
      limit_total_hours,
      max_limit_total_hours,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.patch(`/timesheets/projects`, {
      projects: [
        {
          id: id || undefined,
          name: name || undefined,
          code: code || undefined,
          start_date: start_date || undefined,
          end_date: end_date || undefined,
          limit_total_hours: limit_total_hours || undefined,
          max_limit_total_hours: max_limit_total_hours || undefined,
        },
      ],
    });
    return {
      data,
    };
  },
  examplePayload: updateProjectExamplePayload,
});
