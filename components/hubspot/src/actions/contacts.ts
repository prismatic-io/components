import { action, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import {
  archiveBatchContactsPayload,
  createBatchContactsPayload,
  createContactPayload,
  deleteContactPayload,
  getBatchContactsPayload,
  listContactsPayload,
  updateBatchContactsPayload,
  updateContactPayload,
} from "../examplePayloads";
import {
  additionalProperties,
  after,
  archived,
  associationsList,
  batchInputs,
  connectionInput,
  contactCompany,
  contactEmail,
  contactFirstName,
  contactId,
  contactIds,
  contactlastName,
  contactUpdateCompany,
  contactUpdateEmail,
  contactUpdateFirstName,
  contactUpdatelastName,
  dynamicValues,
  fetchAll,
  fieldValues,
  idProperty,
  limit,
  phone,
  propertiesWithHistory,
  timeout,
  updatePhone,
  updateWebsite,
  website,
} from "../inputs";
import { getAllPaginatedData, getArrayOfObjectsWithKey, getProps, toStringList } from "../util";

const contactProps = ["firstname", "lastname", "email", "company", "website", "phone"];

export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "Retrieve a list of all contacts",
  },
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout || undefined,
      debugRequest,
    });

    const parameterizedProperties = getProps(contactProps, params.additionalProperties || []);

    const data = await getAllPaginatedData(
      client,
      "/crm/v3/objects/contacts",
      params.fetchAll,
      false,
      {
        params: {
          ...parameterizedProperties,
          limit: util.types.toInt(params.limit) || undefined,
          after: util.types.toString(params.after) || undefined,
          associations: toStringList(params.associationsList || []).join(",") || undefined,
          archived: util.types.toBool(params.archived) || false,
        },
      },
    );

    return { data };
  },
  inputs: {
    hubspotConnection: connectionInput,
    additionalProperties,
    associationsList,
    archived,
    timeout,
    fetchAll,
    limit,
    after,
  },
  examplePayload: listContactsPayload,
});

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Get the information and metadata of a contact by Id or Email",
  },
  perform: async (
    context,
    {
      contactEmail,
      contactId,
      additionalProperties,
      timeout,

      hubspotConnection,
      associationsList,
      archived,
    },
  ) => {
    const id = util.types.toString(contactId);
    const email = util.types.toString(contactEmail);
    if (!email && !id) {
      throw new Error("You must supply an Id or an email to get a record.");
    }
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(contactProps, additionalProperties || []);

    const params = {
      ...parameterizedProperties,
      associations: toStringList(associationsList || []).join(",") || undefined,
      archived: util.types.toBool(archived) || false,
    };

    if (id) {
      return {
        data: (
          await client.get(`/crm/v3/objects/contacts/${id}`, {
            params,
          })
        ).data,
      };
    }
    const data = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
    };
    return {
      data: (
        await client.post("/crm/v3/objects/contacts/search", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data,
    };
  },
  inputs: {
    contactId: { ...contactId, required: false },
    contactEmail: { ...contactEmail, required: false },
    additionalProperties,
    associationsList,
    archived,
    timeout,

    hubspotConnection: connectionInput,
  },
  
});

export const deleteContact = action({
  display: {
    label: "Delete Contact",
    description: "Delete a contact by Id",
  },
  perform: async (context, { contactId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (await client.delete(`/crm/v3/objects/contacts/${contactId}`)).data,
    };
  },
  inputs: {
    contactId,
    timeout,

    hubspotConnection: connectionInput,
  },
  examplePayload: deleteContactPayload,
});

export const CreateContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new contact",
  },
  perform: async (
    context,
    {
      contactCompany,
      contactEmail,
      contactFirstName,
      contactlastName,
      phone,
      website,
      timeout,

      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.post("/crm/v3/objects/contacts", {
          properties: {
            company: contactCompany,
            email: contactEmail,
            firstname: contactFirstName,
            lastname: contactlastName,
            phone,
            website,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    contactFirstName,
    contactlastName,
    phone: { ...phone, required: false },
    contactCompany: { ...contactCompany, required: false },
    contactEmail: { ...contactEmail, required: false },
    website: { ...website, required: false },
    fieldValues,
    dynamicValues,
    timeout,

    hubspotConnection: connectionInput,
  },
  examplePayload: createContactPayload,
});

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update the information and metadata of an existing contact",
  },
  perform: async (
    context,
    {
      contactId,
      contactUpdateCompany,
      contactUpdateEmail,
      contactUpdateFirstName,
      contactUpdatelastName,
      updatePhone,
      updateWebsite,
      timeout,

      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    return {
      data: (
        await client.patch(`/crm/v3/objects/contacts/${contactId}`, {
          properties: {
            company: contactUpdateCompany || undefined,
            email: contactUpdateEmail || undefined,
            firstname: contactUpdateFirstName || undefined,
            lastname: contactUpdatelastName || undefined,
            phone: updatePhone || undefined,
            website: updateWebsite || undefined,
            ...fieldValues,
            ...dynamicValues,
          },
        })
      ).data,
    };
  },
  inputs: {
    contactId,
    contactUpdateFirstName,
    contactUpdatelastName,
    contactUpdateCompany,
    contactUpdateEmail,
    updatePhone,
    updateWebsite,
    fieldValues,
    dynamicValues,
    timeout,

    hubspotConnection: connectionInput,
  },
  examplePayload: updateContactPayload,
});

export const archiveBatchContacts = action({
  display: {
    label: "Archive Batch Contacts",
    description: "Archive a batch of contacts by ID",
  },
  perform: async (context, { contactIds, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const payload = { inputs: getArrayOfObjectsWithKey(contactIds, "id") };
    const { data } = await client.post("/crm/v3/objects/contacts/batch/archive", payload);
    return {
      data,
    };
  },
  inputs: {
    contactIds,
    timeout,

    hubspotConnection: connectionInput,
  },
  examplePayload: archiveBatchContactsPayload,
});

export const createBatchContacts = action({
  display: {
    label: "Create Batch Contacts",
    description: "Create a batch of contacts",
  },
  perform: async (context, { timeout, hubspotConnection, batchInputs }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = {
      inputs: batchInputs,
    };

    const { data } = await client.post("/crm/v3/objects/contacts/batch/create", payload);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    batchInputs: {
      ...batchInputs,
      label: "Batch Contacts",
      comments:
        "An array of contact objects to create. See [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts) for properties.",
      example: JSON.stringify([
        {
          associations: [
            {
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 0,
                },
              ],
              to: {
                id: "string",
              },
            },
          ],
          properties: {
            email: "bcooper@biglytics.net",
            phone: "(877) 929-0687",
            company: "Biglytics",
            website: "biglytics.net",
            lastname: "Cooper",
            firstname: "Bryan",
          },
        },
      ]),
    },
    timeout,
  },
  examplePayload: createBatchContactsPayload,
});

export const getBatchContacts = action({
  display: {
    label: "Get Batch Contacts",
    description: "Read a batch of contacts by internal ID, or unique property values.",
  },
  perform: async (
    context,
    {
      hubspotConnection,
      propertiesWithHistory,
      properties,
      idProperty,
      contactIds,
      archived,
      timeout,
    },
  ) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = {
      propertiesWithHistory: propertiesWithHistory || [],
      ...(idProperty && { idProperty }),
      inputs: contactIds ? getArrayOfObjectsWithKey(contactIds, "id") : [],
      properties: properties || [],
    };
    const { data } = await client.post("/crm/v3/objects/contacts/batch/read", payload, {
      params: { archived },
    });

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    propertiesWithHistory,
    properties: {
      ...propertiesWithHistory,
      label: "Property",
    },
    idProperty: { ...idProperty, comments: "An ID property to search by" },
    contactIds: { ...contactIds, required: false },
    archived,
    timeout,
  },
  examplePayload: getBatchContactsPayload,
});

export const updateBatchContacts = action({
  display: {
    label: "Update Batch Contacts",
    description: "Update a batch of contacts",
  },
  perform: async (context, { timeout, hubspotConnection, batchInputs }) => {
    const debugRequest = context.debug.enabled;

    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = {
      inputs: batchInputs,
    };

    const { data } = await client.post("/crm/v3/objects/contacts/batch/update", payload);

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    batchInputs: {
      ...batchInputs,
      label: "Batch Contacts",
      comments:
        "An array of contact objects to update. See [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts) for properties.",
      example: JSON.stringify([
        {
          idProperty: "my_unique_property_name",
          id: "string",
          properties: {
            email: "bcooper@biglytics.net",
            phone: "(877) 929-0687",
            company: "Biglytics",
            website: "biglytics.net",
            lastname: "Cooper",
            firstname: "Bryan",
          },
        },
      ]),
    },
    timeout,
  },
  examplePayload: updateBatchContactsPayload,
});
