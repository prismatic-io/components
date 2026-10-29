import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProjectExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  date,
  limit_total_hours,
  max_limit_total_hours,
  project_code,
  project_name,
} from "../../inputs";

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Create a new project.",
  },
  inputs: {
    connectionInput,
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
      name,
      code,
      start_date,
      end_date,
      limit_total_hours,
      max_limit_total_hours,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(`/timesheets/projects`, {
      projects: [
        {
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
  examplePayload: createProjectExamplePayload,
});
