import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { MailchimpList } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectList = dataSource({
  display: {
    label: "Select List",
    description: "Select a Mailchimp list/audience",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpList>({
      client,
      endpoint: "/lists",
      dataKey: "lists",
      fetchAll: true,
    });

    const lists = data.lists as MailchimpList[];
    const result = lists.map<Element>((list) => ({
      label: list.name,
      key: list.id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});

export default selectList;
