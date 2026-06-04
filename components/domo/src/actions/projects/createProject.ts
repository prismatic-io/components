import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createProjectInputs } from "../../inputs";
import type { CreateProjectBody } from "../types/CreateProjectBody";
import { createProjectExamplePayload } from "../../examplePayloads";

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Creates a new project in a Domo instance.",
  },
  examplePayload: createProjectExamplePayload,
  perform: async (
    context,
    {
      connection,
      members,
      name,
      publicInput,
      description,
      dueDate,
      membersArray,
      publicBody,
      bodyName,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreateProjectBody = {
      ...(bodyName.length && { name: bodyName }),
      ...(membersArray.length && { members: membersArray }),
      ...(publicBody.length && { public: publicBody }),
    };
    const { data } = await client.post(
      `/projects?members=${members}&name=${name}&public=${publicInput}
      ${description.length ? `&description=${description}` : ""}
      ${dueDate.length ? `&dueDate=${dueDate}` : ""}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: createProjectInputs,
});

export default { createProject };
