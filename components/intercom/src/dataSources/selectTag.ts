import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTagInputs } from "../inputs";
import type { Tag } from "../interfaces";

export const selectTag = dataSource({
  display: {
    label: "Select Tag",
    description: "A Picklist of Intercom tags",
  },
  dataSourceType: "picklist",
  inputs: selectTagInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: tags },
    } = await client.get<{ data: Tag[] }>("/tags");

    const result = (tags || []).map(({ id, name }: Tag): Element => {
      return {
        label: name,
        key: id,
      };
    });

    return {
      result,
    };
  },
});
