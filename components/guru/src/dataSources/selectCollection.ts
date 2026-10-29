import { dataSource, type Element } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { selectCollectionInputs } from "../inputs";
import type { GuruCollection } from "../types";

export const selectCollection = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Collection",
    description: "Select a collection from your Guru workspace",
  },
  perform: async (_context, { connection, search }) => {
    const client = getGuruClient(connection, false);

    const queryParams = {
      search,
      sortField: "name",
      sortDir: "ASC",
    };

    const { data: collections } = await client.get<GuruCollection[]>(
      "/collections",
      { params: queryParams },
    );

    return {
      result: collections.map(
        (collection): Element => ({
          label: collection.name,
          key: collection.id,
        }),
      ),
    };
  },
  inputs: selectCollectionInputs,
});
