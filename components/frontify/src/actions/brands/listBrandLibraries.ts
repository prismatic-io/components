import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { LIST_BRAND_LIBRARIES_QUERY } from "../../constants";
import { listBrandLibrariesExamplePayload as examplePayload } from "../../examplePayloads";
import { listBrandLibrariesInputs as inputs } from "../../inputs/brands";
import { graphqlFetchAll } from "../../utils/graphqlFetchAll";
import type ListBrandLibrariesResponse from "../types/listBrandLibraries";


export const listBrandLibraries = action({
  display: {
    label: "List Brand Libraries",
    description:
      "Retrieve list of Libraries belonging to a Brand. For full Library details, please use the 'Get Library' action.",
  },
  perform: async (
    context,
    { connection, page, limit, brandId, fetchAll },
  ): Promise<{ data: ListBrandLibrariesResponse }> => {
    const client = createClient({ connection, debug: context.debug.enabled });

    if (fetchAll) {
      const hasNextPath = ["brand", "libraries", "hasNextPage"];
      const responses: ListBrandLibrariesResponse[] = await graphqlFetchAll({
        client,
        query: LIST_BRAND_LIBRARIES_QUERY,
        params: { brandId },
        hasNextPath,
      });

      if (responses.length === 1) {
        return { data: responses[0] };
      }

      const baseResponse = responses.slice(-1)[0];
      const combinedLibraries = responses.reduce((combined, response) => {
        return combined.concat(response.brand.libraries.items);
      }, []);

      const formattedResponse: { data: ListBrandLibrariesResponse } = {
        data: {
          brand: {
            ...baseResponse.brand,
            libraries: {
              ...baseResponse.brand.libraries,
              items: combinedLibraries,
            },
          },
        },
      };

      return formattedResponse;
    }

    const response: ListBrandLibrariesResponse = await client.request(
      LIST_BRAND_LIBRARIES_QUERY,
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
