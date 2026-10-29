import { dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { filterAndSort } from "../utils";
import { connectionInput, filterQueryInput } from "../inputs";
import type { ElementWithLabel } from "../types";

interface CustomObjectType {
  name: string;
  displayName: string;
}

export const selectCustomObject = dataSource({
  display: {
    label: "Select Custom Object",
    description: "Select a custom object type from a dropdown menu.",
  },
  inputs: {
    connection: connectionInput,
    filterQuery: filterQueryInput,
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, filterQuery }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get(`/v1/customobjects.json`);

    const objects = (
      (data.result as CustomObjectType[]) || []
    ).map<ElementWithLabel>((obj) => ({
      key: util.types.toString(obj.name),
      label: obj.displayName,
    }));

    return { result: filterAndSort(objects, filterQuery) };
  },
  examplePayload: {
    result: [{ label: "Car", key: "car_c" }],
  },
});
