import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listContactsResponse } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  order,
  page,
  perPage,
  startingAfterInput,
} from "../../inputs";
import type { Contact } from "../../interfaces";
import { paginateRecords } from "../../util";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "Page through all Contacts",
  },
  inputs: {
    fetchAll,
    page,
    perPage,
    order,
    startingAfter: startingAfterInput,
    connection: connectionInput,
  },
  perform: async (
    context,
    { connection, order, page, perPage, startingAfter, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateRecords<Contact>(
      client,
      { order, page, per_page: perPage, starting_after: startingAfter },
      fetchAll,
      "/contacts",
    );
    return { data };
  },
  examplePayload: {
    data: listContactsResponse,
  },
});
