import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateProjectInputs } from "../../inputs";
import type { UpdateProjectBody } from "../types/UpdateProjectBody";
import type { UpdateProjectQueryParams } from "../types/UpdateProjectQueryParams";

export const updateProject = action({
  display: {
    label: "Update Project",
    description:
      "Updates attributes of an existing project in a Domo instance.",
  },
  perform: async (
    context,
    {
      connection,
      projectId,
      description,
      dueDate,
      name,
      publicUpdate,
      updateProjectBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateProjectQueryParams = {};
    if (description.length) queryParams.description = description;
    if (dueDate.length) queryParams.dueDate = dueDate;
    if (name.length) queryParams.name = name;
    if (publicUpdate.length) queryParams.public = publicUpdate;

    let body = {};
    if (updateProjectBody.length)
      body = JSON.parse(updateProjectBody) as UpdateProjectBody;

    const { data } = await client.put(`/projects/${projectId}`, body, {
      params: queryParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: updateProjectInputs,
});

export default { updateProject };
