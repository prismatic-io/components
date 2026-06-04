import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs";
import { sortArray } from "../../utils";

interface Site {
  createdDateTime: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  webUrl: string;
  displayName: string;
  siteCollection: unknown;
}
interface GetSitesResponse {
  "@odata.context": string;
  "@odata.nextLink"?: string;
  value: Site[];
}

const mapToElement = (site: Site): Element => ({
  key: site.id,
  label: site.displayName,
});

export const listSites = dataSource({
  display: {
    label: "List Sites from Sharepoint",
    description: "A picklist of Sites",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<GetSitesResponse>("/sites", {
      params: { search: "" },
    });
    const sites: Element[] = (data.value || []).map((site) => mapToElement(site));
    let nextLink = data?.["@odata.nextLink"];

    while (nextLink) {
      const { data } = await client.get<GetSitesResponse>(nextLink);
      sites.push(...(data.value || []).map((site) => mapToElement(site)));
      nextLink = data?.["@odata.nextLink"];
    }
    return {
      result: sortArray(sites),
    };
  },
  dataSourceType: "picklist",
});
