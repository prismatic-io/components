import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import type { Person } from "../types/persons";
import { personsDatasource } from "../examplePayloads/datasources";
import { WebhookVersion } from "../constants";

export const selectPerson = dataSource({
  display: {
    label: "Select Person",
    description: "Select a Person from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Person>(client, "persons", {}, true);

    const objects = sortRecords(data, "id").map<Element>((person) => ({
      key: person.id.toString(),
      label: `${person.first_name}${person.last_name ? ` ${person.last_name}` : ""}`,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: personsDatasource,
  },
});
