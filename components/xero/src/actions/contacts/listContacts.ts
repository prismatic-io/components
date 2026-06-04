import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import {
  page,
  connectionInput,
  modifiedAfter,
  where,
  fetchAll,
} from "../../inputs";
import { type Contact } from "../../interfaces/Contact";
import { fetchAllData } from "../../util";
import { listContactsExamplePayload } from "../../examplePayloads";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "List all contacts",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const data = await fetchAllData<Contact, "Contacts">({
      client,
      path: "/contacts",
      key: "Contacts",
      queryParams: {
        page: util.types.toInt(params.page) || undefined,
        where: util.types.toString(params.where) || undefined,
      },
      headers: {
        "If-Modified-Since": util.types.toString(params.modifiedAfter),
      },
      fetchAll: params.fetchAll,
    });
    return { data };
  },
  inputs: {
    xeroConnection: connectionInput,
    fetchAll,
    page,
    modifiedAfter,
    where,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examplePayload: listContactsExamplePayload as any,
});
