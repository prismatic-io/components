import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createHttpClient } from "../client";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectAttachment = dataSource({
  display: {
    label: "Select Attachment",
    description: "Select an attachment from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, false);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Attachable",
      objectName: "Attachable",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((attachable) => ({
      key: (attachable.Id as string).toString(),
      label: (attachable.FileName as string) || `Attachment ${attachable.Id}`,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "invoice_scan.pdf", key: "5000000000001348400" },
      { label: "receipt_photo.jpg", key: "5000000000001348401" },
    ],
  },
});
