import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  connectionInput,
  fetchAll,
  includeSampleContacts,
  listId,
  listName,
} from "../inputs";
import { pageSize, pageToken } from "../inputs";
import { API_VERSION } from "../constants";
import { fetchPaginatedData } from "../helpers";

export const createList = action({
  display: {
    label: "Create List",
    description: "Create a new contact list",
  },
  inputs: {
    sendGridConnection: connectionInput,
    name: listName,
  },
  perform: async (_context, { sendGridConnection, name }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "POST",
      url: `/${API_VERSION}/marketing/lists`,
      body: { name },
    });
    return { data: body };
  },
  examplePayload: {
    data: {
      id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "My New Contact List",
      contact_count: 0,
      _metadata: {
        self: "https://api.sendgrid.com/v3/marketing/lists/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      },
    },
  },
});

export const getAllLists = action({
  display: {
    label: "Get All Lists",
    description: "Retrieve all contact lists with pagination support",
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
      `/${API_VERSION}/marketing/lists`,
      fetchAll,
      { page_size, page_token },
    );

    return {
      data,
    };
  },
  examplePayload: {
    data: {
      result: [
        {
          id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          name: "My Contact List",
          contact_count: 1000,
          _metadata: {
            self: "https://api.sendgrid.com/v3/marketing/lists/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          },
        },
      ],
      _metadata: {
        count: 1,
        self: "https://api.sendgrid.com/v3/marketing/lists",
      },
      pagination: {
        nextPageToken: "next_page_token",
        previousPageToken: "previous_page_token",
        totalCount: 100,
      },
    },
  },
});

export const getListById = action({
  display: {
    label: "Get List by ID",
    description: "Retrieve a specific contact list by its ID",
  },
  inputs: {
    sendGridConnection: connectionInput,
    list_id: listId,
    contact_sample: includeSampleContacts,
  },
  perform: async (
    _context,
    { sendGridConnection, list_id, contact_sample },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "GET",
      url: `/${API_VERSION}/marketing/lists/${list_id}`,
      qs: contact_sample ? { contact_sample: true } : undefined,
    });
    return { data: body };
  },
  examplePayload: {
    data: {
      id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "My Contact List",
      contact_count: 42,
      contact_sample: [
        {
          id: "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
          email: "example@email.com",
          first_name: "John",
          last_name: "Doe",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ],
      _metadata: {
        self: "https://api.sendgrid.com/v3/marketing/lists/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      },
    },
  },
});
