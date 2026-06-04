import { dataSource, type Element } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { selectCardInputs } from "../inputs";
import { fetchGuruResults } from "../util";
import type { GuruCard } from "../types";

export const selectCard = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Card",
    description: "Select a card from your Guru workspace",
  },
  perform: async (_context, { connection, q, searchTerms, queryType }) => {
    const client = getGuruClient(connection, false);
    const url = "/search/query";
    const queryParams = {
      q,
      searchTerms,
      queryType,
      sortField: "title",
      sortOrder: "ASC",
    };
    const cards = await fetchGuruResults<GuruCard>(
      client,
      url,
      true,
      queryParams,
    );

    return {
      result: cards.map(
        (card: GuruCard): Element => ({
          label: card.preferredPhrase,
          key: card.id,
        }),
      ),
    };
  },
  inputs: selectCardInputs,
});
