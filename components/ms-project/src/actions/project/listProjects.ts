import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import { toPaginationParams } from "../../helper";
import { connection, pageNumber, pageSize, queryString } from "../../inputs";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "List all the projects in a given sharepoint site",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.get("/Projects", {
      params: toPaginationParams(params.pageSize, params.pageNumber),
    });

    return {
      data,
    };
  },
  inputs: { connection, queryString, pageSize, pageNumber },
  examplePayload: { data: [{ "odata.type": "PS.PublishedProject" }] },
});

export default listProjects;
