import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { paginateResults } from "../util";
import { selectContactListInputs } from "../inputs";
import { selectContactListExamplePayload } from "../examplePayloads";
import type { ContactList } from "../types";








export const selectContactList = dataSource({
  display: {
    label: "Select Contact List",
    description: "A picklist of your SurveyMonkey contact lists.",
  },
  inputs: selectContactListInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    
    const response = await paginateResults<ContactList>(
      client,
      "/contact_lists",
      true, 
    );

    
    const result = response.data.map<Element>((list) => ({
      label: list.name,
      key: list.id,
    }));

    return { result };
  },
  examplePayload: selectContactListExamplePayload,
  dataSourceType: "picklist",
});
