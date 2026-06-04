import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { searchCardsInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import { searchCardsPayload } from "../../examplePayloads";

export const searchCards = action({
  display: {
    label: "Search Cards",
    description: "Search for cards and content in Guru",
  },
  perform: async (
    context,
    { connection, q, searchTerms, queryType, maxResults, fetchAll },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const queryParams = {
      q,
      searchTerms,
      queryType,
      maxResults,
    };

    const url = "/search/query";
    const data = await fetchGuruResults(client, url, fetchAll, queryParams);

    return { data };
  },
  inputs: searchCardsInputs,
  examplePayload: searchCardsPayload,
});
