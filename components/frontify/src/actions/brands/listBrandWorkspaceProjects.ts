import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { listBrandWorkspaceProjectsExamplePayload as examplePayload } from "../../examplePayloads";
import { listBrandWorkspaceProjectsInputs as inputs } from "../../inputs/brands";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListBrandWorkspaceProjectsResponse from "../types/listBrandWorkspaceProjects";

export const listBrandWorkspaceProjectsQuery = gql`
  query listBrandWorkspaceProjects($brandId: ID!, $limit: Int, $page: Int) {
    brand(id: $brandId) {
      id
      name
      workspaceProjects(limit: $limit, page: $page) {
        total
        limit
        page
        hasNextPage
        items {
          id
          name
        }
      }
    }
  }
`;


export const listBrandWorkspaceProjects = action({
  display: {
    label: "List Brand Workspace Projects",
    description:
      "Retrieve list of Workspace Projects belonging to a Brand. For full details, please use the 'Get Workspace Project' action.",
  },
  perform: async (
    context,
    { connection, page, limit, brandId, fetchAll },
  ): Promise<{ data: ListBrandWorkspaceProjectsResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });

    if (fetchAll) {
      const hasNextPath = ["brand", "workspaceProjects", "hasNextPage"];
      const responses: ListBrandWorkspaceProjectsResponse[] =
        await graphqlFetchAll({
          client,
          query: listBrandWorkspaceProjectsQuery,
          params: { brandId },
          hasNextPath,
        });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedWorkspaceProjects = responses.reduce(
        (combined, response) => {
          return combined.concat(response.brand.workspaceProjects.items);
        },
        [],
      );

      const formattedResponse: { data: ListBrandWorkspaceProjectsResponse } = {
        data: {
          brand: {
            ...baseResponse.brand,
            workspaceProjects: {
              ...baseResponse.brand.workspaceProjects,
              items: combinedWorkspaceProjects,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListBrandWorkspaceProjectsResponse = await client.request(
      listBrandWorkspaceProjectsQuery,
      {
        page,
        limit,
        brandId,
      },
    );

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
