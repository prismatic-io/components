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
  perform: async (context, { connection, projectId, projectDetails }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateProjectQueryParams = {};
    if (projectDetails.description.length)
      queryParams.description = projectDetails.description;
    if (projectDetails.dueDate.length)
      queryParams.dueDate = projectDetails.dueDate;
    if (projectDetails.name.length) queryParams.name = projectDetails.name;
    if (projectDetails.publicUpdate.length)
      queryParams.public = projectDetails.publicUpdate;

    let body = {};
    if (projectDetails.updateProjectBody.length)
      body = JSON.parse(projectDetails.updateProjectBody) as UpdateProjectBody;

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
