import { action, outputSchema } from "@prismatic-io/spectral";
import { getContactOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getContactInputs } from "../../inputs";
import { getProps } from "../../util";
import { CONTACT_PROPS } from "../../constants";
export const getContact = action({
  display: {
    label: "Get Contact",
    description:
      "Get the information and metadata of a contact by Id or Email.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      contactEmail: email,
      contactId: id,
      additionalProperties,
      timeout,
      hubspotConnection,
      associationsList,
      archived,
    },
  ) => {
    if (!email && !id) {
      throw new Error("You must supply an Id or an email to get a record.");
    }
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      CONTACT_PROPS,
      additionalProperties || [],
    );
    const params = {
      ...parameterizedProperties,
      associations: associationsList,
      archived: archived,
    };
    if (id) {
      const { data } = await client.get(`/crm/v3/objects/contacts/${id}`, {
        params,
      });
      return { data };
    }
    const searchBody = {
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
    const { data } = await client.post(
      "/crm/v3/objects/contacts/search",
      searchBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { data };
  },
  inputs: getContactInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getContactOutputSchema,
  }),
});
