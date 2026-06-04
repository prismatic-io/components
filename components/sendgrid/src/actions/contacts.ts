import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  connectionInput,
  contactListIds,
  contactsInput,
  emailsInput,
  fieldMappingsInput,
  isCompressedInput,
  jobId,
} from "../inputs";
import { API_VERSION } from "../constants";

export const addOrUpdateContact = action({
  display: {
    label: "Add or Update Contact",
    description:
      "Add or update a contact. This can also be used to add contacts to a list.",
  },
  inputs: {
    sendGridConnection: connectionInput,
    list_ids: contactListIds,
    contacts: contactsInput,
  },
  perform: async (_context, { sendGridConnection, list_ids, contacts }) => {
    const client = createAuthorizedClient(sendGridConnection);

    let parsedContacts: unknown[];
    try {
      
      
      parsedContacts =
        typeof contacts === "string" ? JSON.parse(contacts) : contacts;
      if (!Array.isArray(parsedContacts)) {
        throw new Error("Contacts input must be an array of contact objects.");
      }
    } catch (error) {
      const e = error as Error;
      throw new Error(`Invalid JSON format for Contacts: ${e.message}`);
    }

    const payload: { list_ids?: string[]; contacts: unknown[] } = {
      contacts: parsedContacts,
    };

    if (list_ids && typeof list_ids === "string") {
      payload.list_ids = list_ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);
    }

    const [_response, body] = await client.request({
      method: "PUT",
      url: `/${API_VERSION}/marketing/contacts`,
      body: payload,
    });
    return { data: body };
  },
  examplePayload: {
    data: {
      job_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      _metadata: {
        self: "https://api.sendgrid.com/v3/marketing/contacts/imports/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      },
    },
  },
});

export const getContactsByEmails = action({
  display: {
    label: "Get Contacts by Emails",
    description: "Retrieve contacts by their email addresses.",
  },
  inputs: {
    sendGridConnection: connectionInput,
    emails: emailsInput,
  },
  perform: async (_context, { sendGridConnection, emails }) => {
    const client = createAuthorizedClient(sendGridConnection);

    let emailArray: string[];
    if (typeof emails === "string") {
      emailArray = emails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);
    } else {
      
      throw new Error("Emails input must be a comma-separated string.");
    }

    if (!emailArray || emailArray.length === 0) {
      throw new Error("Please provide at least one email address.");
    }

    try {
      
      const [_response, body] = await client.request({
        method: "POST",
        url: `/${API_VERSION}/marketing/contacts/search/emails`,
        body: { emails: emailArray },
      });
      return { data: body };
    } catch (err) {
      const error = err as {
        response?: { body?: { errors: unknown }; statusCode?: number };
        code?: string;
      };
      if (
        error.response?.body?.errors &&
        Array.isArray(error.response.body.errors)
      ) {
        const messages = error.response.body.errors
          .map(
            (e: { field: string; message: string }) =>
              `${e.field}: ${e.message}`,
          )
          .join(", ");
        throw new Error(
          `Failed to get contacts by emails: ${messages} (Status: ${
            error.code || error.response?.statusCode
          })`,
        );
      }
      throw new Error(
        `Failed to get contacts by emails: ${util.types.toString(
          error,
        )} (Status: ${error.code || error.response?.statusCode})`,
      );
    }
  },
  examplePayload: {
    data: {
      result: {
        "test1@example.com": {
          contact: {
            address_line_1: "123 Main St",
            address_line_2: " Apt 4B",
            alternate_emails: ["testalt@example.com"],
            city: "Anytown",
            country: "US",
            email: "test1@example.com",
            first_name: "Test",
            id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            last_name: "User",
            list_ids: ["yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"],
            postal_code: "12345",
            state_province_region: "CA",
            phone_number: "555-123-4567",
            whatsapp: "15551234567",
            line: "testuserline",
            facebook: "testuserfb",
            unique_name: "testuserunique",
            custom_fields: { field1: "value1" },
            created_at: "2023-01-01T12:00:00Z",
            updated_at: "2023-01-01T12:00:00Z",
            _metadata: { self: "url" },
          },
        },
      },
    },
  },
});

export const initiateContactsImport = action({
  display: {
    label: "Initiate Contacts Import",
    description:
      "Initiates a CSV contact import. Returns a URL and headers for uploading the CSV file.",
  },
  inputs: {
    sendGridConnection: connectionInput,
    list_ids: contactListIds,
    field_mappings: fieldMappingsInput,
    is_compressed: isCompressedInput,
  },
  perform: async (
    _context,
    { sendGridConnection, list_ids, field_mappings, is_compressed },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);

    let parsedFieldMappings: (string | null)[];
    try {
      parsedFieldMappings =
        typeof field_mappings === "string"
          ? JSON.parse(field_mappings)
          : field_mappings;
      if (
        !Array.isArray(parsedFieldMappings) ||
        parsedFieldMappings.some((m) => typeof m !== "string" && m !== null)
      ) {
        throw new Error("Field Mappings must be an array of strings or null.");
      }
    } catch (error) {
      const e = error as Error;
      throw new Error(`Invalid JSON format for Field Mappings: ${e.message}`);
    }

    const payload: {
      list_ids?: string[];
      file_type: "csv";
      field_mappings: (string | null)[];
    } = {
      file_type: "csv",
      field_mappings: parsedFieldMappings,
    };

    if (list_ids && typeof list_ids === "string") {
      payload.list_ids = list_ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);
      if (payload.list_ids.length === 0) delete payload.list_ids;
    }

    const [_response, body] = await client.request({
      method: "PUT",
      url: `/${API_VERSION}/marketing/contacts/imports`,
      body: payload,
      headers: is_compressed ? { "Content-Encoding": "gzip" } : undefined,
    });
    return { data: body };
  },
  examplePayload: {
    data: {
      job_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      upload_uri: "https://s3.amazonaws.com/path/to/your/upload_location",
      upload_headers: [
        {
          header: "Content-Type",
          value: "text/csv",
        },
        {
          header: "x-amz-meta-job_id",
          value: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
      ],
      _metadata: {
        self: "https://api.sendgrid.com/v3/marketing/contacts/imports/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      },
    },
  },
});

export const getImportStatus = action({
  display: {
    label: "Get Import Status",
    description: "Check the status of a contact import job",
  },
  inputs: {
    sendGridConnection: connectionInput,
    job_id: jobId,
  },
  perform: async (_context, { sendGridConnection, job_id }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "GET",
      url: `/${API_VERSION}/marketing/contacts/imports/${job_id}`,
    });
    return { data: body };
  },
  examplePayload: {
    data: {
      id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      status: "completed",
      job_type: "upsert",
      results: {
        requested_count: 100,
        created_count: 80,
        updated_count: 20,
        deleted_count: 0,
        errored_count: 0,
        errors_url:
          "https://api.sendgrid.com/v3/marketing/contacts/imports/errors/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        started_at: "2024-01-01T00:00:00Z",
        finished_at: "2024-01-01T00:01:00Z",
      },
    },
  },
});
