import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { myConnectionField, version } from "../inputs";

export const businessNames = dataSource({
  display: {
    label: "Business Names",
    description: "A picklist of business names",
  },
  inputs: {
    connection: myConnectionField,
    version,
  },
  perform: async (context, { version, connection }) => {
    const client = createClient(connection, false, version);
    const { data } = await client.get("/me/businesses");
    const result = (
      (data?.data as { name: string; id: string }[]) ?? []
    ).map<Element>(({ name, id }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
