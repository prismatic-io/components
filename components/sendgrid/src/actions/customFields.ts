import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { connectionInput, fetchAll } from "../inputs";
import { pageSize, pageToken } from "../inputs";
import { API_VERSION } from "../constants";
import { fetchPaginatedData } from "../helpers";

export const getAllFieldDefinitions = action({
  display: {
    label: "Get All Field Definitions",
    description:
      "Retrieve all custom field definitions with pagination support",
  },
  inputs: {
    sendGridConnection: connectionInput,
    page_size: pageSize,
    page_token: pageToken,
    fetchAll,
  },
  perform: async (
    _context,
    { sendGridConnection, page_size, page_token, fetchAll },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);

    const data = await fetchPaginatedData(
      client,
      `/${API_VERSION}/marketing/field_definitions`,
      fetchAll,
      { page_size, page_token },
    );
    return { data };
  },
  examplePayload: {
    data: {
      custom_fields: [
        {
          id: "w1",
          name: "pet",
          field_type: "Text",
          _metadata: {
            self: "https://api.sendgrid.com/v3/marketing/field_definitions/w1",
          },
        },
      ],
      reserved_fields: [
        {
          id: "_rf1",
          name: "first_name",
          field_type: "Text",
          _metadata: {
            self: "https://api.sendgrid.com/v3/marketing/field_definitions/_rf1",
          },
        },
      ],
      _metadata: {
        count: 2,
        self: "https://api.sendgrid.com/v3/marketing/field_definitions",
      },
      pagination: {
        nextPageToken: "next_page_token",
        previousPageToken: "previous_page_token",
        totalCount: 100,
      },
    },
  },
});
