import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompaniesResponse } from "../../examplePayloads";
import {
  companyId,
  connectionInput,
  fetchAll,
  order,
  page,
  perPage,
  startingAfterInput,
} from "../../inputs";
import { nameInput } from "../../inputs/companies";
import { segmentId } from "../../inputs/general";
import { idInput } from "../../inputs/tags";
import type { Company } from "../../interfaces";
import { paginateRecords } from "../../util";

export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Page through all Companies",
  },
  inputs: {
    fetchAll,
    page,
    perPage,
    order,
    companyName: {
      ...nameInput,
      required: false,
      comments: "Name of the company to be used as filter.",
    },
    companyId: {
      ...companyId,
      comments: "Id of the company to be used as filter.",
    },
    tagId: {
      ...idInput,
      required: false,
      comments: "Id of the tag to be used as filter.",
    },
    segmentId,
    startingAfter: startingAfterInput,
    connection: connectionInput,
  },
  perform: async (
    context,
    {
      connection,
      order,
      page,
      perPage,
      startingAfter,
      fetchAll,
      companyId,
      companyName,
      tagId,
      segmentId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateRecords<Company>(
      client,
      {
        company_id: companyId,
        name: companyName,
        tag_id: tagId,
        segment_id: segmentId,
        order,
        page,
        per_page: perPage,
        starting_after: startingAfter,
      },
      fetchAll,
      "/companies",
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listCompaniesResponse,
  },
});
